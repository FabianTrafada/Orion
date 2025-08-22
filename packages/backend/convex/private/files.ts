import { ConvexError, v } from "convex/values";
import {
    contentHashFromArrayBuffer,
    guessMimeTypeFromContents,
    guessMimeTypeFromExtension,
    RAG,
    vEntryId,
} from "@convex-dev/rag";

import { action, mutation } from "../_generated/server";
import { extractTextContent } from "../lib/extractTextContent";
import rag from "../system/ai/rag";
import { Id } from "../_generated/dataModel";

function guessMimeType(filename: string, bytes: ArrayBuffer): string {
    return (
        guessMimeTypeFromExtension(filename) ||
        guessMimeTypeFromContents(bytes) ||
        "application/octet-stream"
    );
};

export const deleteFile = mutation({
    args: {
        entryId: vEntryId,
    },
    handler: async (ctx, args) => {
        const identiy = await ctx.auth.getUserIdentity();

        if (identiy === null) {
            throw new ConvexError({
                code: "UNAUTHORIZED",
                message: "Identity not found",
            });
        }

        const orgId = identiy.orgId as string;

        if (!orgId) {
            throw new ConvexError({
                code: "UNAUTHORIZED",
                message: "Organization not found",
            })
        }

        const namespace = await rag.getNamespace(ctx, {
            namespace: orgId,
        });

        if (!namespace) {
            throw new ConvexError({
                code: "UNAUTHORIZED",
                message: "Invalid namespace",
            });
        }
        
        const entry = await rag.getEntry(ctx, {
            entryId: args.entryId,
        });

        if (!entry) {
            throw new ConvexError({
                code: "NOT_FOUND",
                message: "Entry not found",
            });
        }
        
        if (entry.metadata?.uploadedBy !== orgId) {
            throw new ConvexError({
                code: "UNAUTHORIZED",
                message: "Invalid organization Id",
            });
        }

        if (entry.metadata?.storageId) {
            await ctx.storage.delete(entry.metadata.storageId as Id<"_storage">);
        }

        await rag.deleteAsync(ctx, {
            entryId: args.entryId,
        });
    }
})

export const addFile = action({
    args: {
        filename: v.string(),
        mimeType: v.string(),
        bytes: v.bytes(),
        category: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identiy = await ctx.auth.getUserIdentity();

        if (identiy === null) {
            throw new ConvexError({
                code: "UNAUTHORIZED",
                message: "Identity not found",
            });
        }

        const orgId = identiy.orgId as string;

        if (!orgId) {
            throw new ConvexError({
                code: "UNAUTHORIZED",
                message: "Organization not found",
            })
        }

        const { bytes, filename, category } = args;

        const mimeType = args.mimeType || guessMimeType(filename, bytes);
        const blob = new Blob([bytes], { type: mimeType });

        const storageId = await ctx.storage.store(blob);

        const text = await extractTextContent(ctx, {
            storageId,
            filename,
            bytes,
            mimeType,
        });

        const { entryId, created } = await rag.add(ctx, {
            // SUPER IMPORTANT: What search space to add this to. You cannot search accross names,
            // If not added, it will be considered global (we don't want this)
            namespace: orgId,
            text,
            key: filename,
            title: filename,
            metadata: {
                storageId, // This is used to delete the file from the storage
                uploadedBy: orgId, // This is used to check if the user is allowed to delete the file
                filename,
                category: category ?? null,
            },
            contentHash: await contentHashFromArrayBuffer(bytes) // To avoid re-inserting if the file content hasn't changed
        });

        if (!created) {
            console.debug("Entry already exists, skipping");
            await ctx.storage.delete(storageId);
        };

        return {
            url: await ctx.storage.getUrl(storageId),
            entryId,
        };
    },
});