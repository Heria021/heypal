import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextareaAutosize from "react-textarea-autosize";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import { useMutationState } from "@/hooks/useMutationState";
import { api } from "@/convex/_generated/api";

const setMoodStatus = z.object({
    content: z.string().min(1, {
        message: "This field can't be empty",
    }),
});

interface MoodStatusFormProps {
    moodStatus: string;
    userId: string;
}

function MoodStatusForm({ moodStatus, userId }: MoodStatusFormProps) {
    const { mutate: updateMoodStatus } = useMutationState(api.profile.updateMoodStatus);

    const form = useForm<z.infer<typeof setMoodStatus>>({
        resolver: zodResolver(setMoodStatus),
        defaultValues: {
            content: "",
        },
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        form.setValue("content", event.target.value);
    };

    const handleSubmit = async (value: z.infer<typeof setMoodStatus>) => {
        console.log(value.content)
        updateMoodStatus({
            userProfileId: userId,
            content: value.content
        }).then(() => {
            form.reset()
            toast.success('Mood status updated.')
        }).catch((error) => toast.error(error instanceof ConvexError ? error.data : "Unexpected error occured"))
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl className="flex w-full h-full items-center justify-center">
                                <TextareaAutosize
                                    onKeyDown={async (e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            await form.handleSubmit(handleSubmit)();
                                        }
                                    }}
                                    placeholder={moodStatus || "Enter your mood..."}
                                    rows={1}
                                    maxRows={2}
                                    {...field}
                                    onChange={handleInputChange}
                                    className="w-full min-h-full outline-none leading-none no-scrollbar border-0 resize-none bg-transparent p-[1px] text-xs placeholder:text-primary-foreground"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}

export default MoodStatusForm;