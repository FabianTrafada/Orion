import { UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@workspace/ui/components/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@workspace/ui/components/select";

import { useVapiAssistants, useVapiPhoneNumbers } from "@/modules/plugins/hooks/use-vapi-data";
import { FormSchema } from "../../types";

interface VapiFormFieldsProps {
    form: UseFormReturn<FormSchema>;
}

export const VapiFormFields = ({
    form,
}: VapiFormFieldsProps) => {
    const { data: assistants, isLoading: assistantsLoading } = useVapiAssistants();
    const { data: phoneNumbers, isLoading: phoneNumbersLoading } = useVapiPhoneNumbers();

    const disabled = form.formState.isSubmitting

    return (
        <>
            <FormField 
                control={form.control}
                name="vapiSettings.assistantId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Voice Assistant</FormLabel>
                            <Select 
                                disabled={assistantsLoading || disabled}
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue 
                                            placeholder={
                                                assistantsLoading
                                                    ? "Loading assistants..."
                                                    : "Select an assistant"
                                            }
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    {assistants.map((assistant) => (
                                        <SelectItem
                                            key={assistant.id}
                                            value={assistant.id}
                                        >
                                            {assistant.name || "Unnamed Assistant"} -{" "}
                                            {assistant.model?.model || "Unknown Model"}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                The Vapi assistant to for voice calls
                            </FormDescription>
                            <FormMessage />
                    </FormItem>
                )}
            />
            <FormField 
                control={form.control}
                name="vapiSettings.phoneNumber"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Display Phone Number</FormLabel>
                            <Select 
                                disabled={phoneNumbersLoading || disabled}
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue 
                                            placeholder={
                                                assistantsLoading
                                                    ? "Loading phone numbers..."
                                                    : "Select an phone number"
                                            }
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    {phoneNumbers.map((phoneNumber) => (
                                        <SelectItem
                                            key={phoneNumber.id}
                                            value={phoneNumber.number || phoneNumber.id}
                                        >
                                            {phoneNumber.number || "Unknown"} -{" "}
                                            {phoneNumber.name || "Unnamed"}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Phone number to display on the chat widget
                            </FormDescription>
                            <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}