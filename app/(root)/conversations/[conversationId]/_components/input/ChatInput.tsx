import { Card } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { api } from '@/convex/_generated/api'
import { useConversation } from '@/hooks/useConversation'
import { useMutationState } from '@/hooks/useMutationState'
import { zodResolver } from '@hookform/resolvers/zod'
import { ConvexError, v } from 'convex/values'
import React, { useRef } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import TextareaAutosize from 'react-textarea-autosize'
import { Button } from '@/components/ui/button'
import { SendHorizontal } from 'lucide-react'
import { useForm } from 'react-hook-form'

type Props = {}
const chatMessageSchema = z.object({
    content: z.string().min(1, {
        message: "This field cann't be empty"
    }),
})

const ChatInput = (props: Props) => {
    const textareRef = useRef<HTMLTextAreaElement | null>(null)

    const {conversationId} = useConversation();
    const {mutate: createMessage, pending} = useMutationState(api.message.create);

    const form = useForm<z.infer<typeof chatMessageSchema>>({
        resolver: zodResolver(chatMessageSchema),
        defaultValues: {
            content: "",
        }
    })

    const handleInputChange = (event: any) => 
        {
            const {value, selectionStart} = event.target;

            if(selectionStart !== null){
                form.setValue("content", value)
            }
        }

    const handleSubmit = async (value: z.infer<typeof chatMessageSchema>) =>{
        createMessage({
            conversationId,
            type: "text",
            content: [value.content]
        }).then(()=>{
            form.reset()
        }).catch((error)=>toast.error(error instanceof ConvexError ? error.data : "Unexpected error occured"))
    }

  return (
    <Card className="w-full p-2 rounded-lg">
    <div className="flex gap-2 items-end w-full">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex items-center gap-2 w-full">
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem className="h-full w-full flex items-center">
                            <FormControl>
                                <TextareaAutosize
                                    onKeyDown={async (e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault(); 
                                            await form.handleSubmit(handleSubmit)();
                                        }
                                    }}
                                    rows={1}
                                    maxRows={3}
                                    {...field}
                                    onChange={handleInputChange}
                                    onClick={handleInputChange}
                                    placeholder="Type a Message"
                                    className="w-full min-h-full resize-none border-0 outline-0 bg-card font-semibold text-card-foreground placeholder:text-muted-foreground p-1.5"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button size={'icon'} type='submit' disabled={pending}>
                    <SendHorizontal/>
                </Button>
            </form>
        </Form>
    </div>
</Card>
  )
}

export default ChatInput