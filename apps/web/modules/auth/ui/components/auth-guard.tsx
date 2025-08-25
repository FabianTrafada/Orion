"use client";

import { Authenticated, Unauthenticated,AuthLoading } from "convex/react";
import { AuthLayout } from "../layouts/auth-layout";
import { SignInView } from "../views/sign-in-view";

export const AuthGuard = ({ children }: { children: React.ReactNode}) => {
    return (
        <>
            <AuthLoading>
                <AuthLayout>
                    <div className="flex items-center justify-center py-12 text-sm text-muted-foreground"><span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />Loading...</div>
                </AuthLayout>
            </AuthLoading>
            <Authenticated>
                {children}
            </Authenticated>
            <Unauthenticated>
                <AuthLayout>
                    <SignInView />
                </AuthLayout>
            </Unauthenticated>
        </>
    )
}