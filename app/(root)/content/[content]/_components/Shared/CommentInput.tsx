import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '@/components/ui/button';
import { SendHorizontal } from 'lucide-react';
import { Id } from '@/convex/_generated/dataModel';
import { useMutationState } from '@/hooks/useMutationState';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { ConvexError } from 'convex/values';

type Props = {
    postId: Id<'post'>;
};

const CommentInput: React.FC<Props> = ({ postId }) => {
    const [message, setMessage] = useState("");
    const { mutate: createComment, pending } = useMutationState(api.posts.createComment);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            console.log(`Comment submitted for postId: ${postId}`, message);
            createComment({ postId, comment: message })
                .then(() => {
                    toast.success('Comment sent!');
                })
                .catch((error) => {
                    toast.error(error instanceof ConvexError ? error.message : 'Unexpected error occurred');
                });
            setMessage("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex gap-2">
            <TextareaAutosize
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                    }
                }}
                rows={1}
                maxRows={3}
                placeholder="Type a Message"
                className="w-full bg-transparent resize-none text-sm rounded-md border border-gray-500/40 text-white p-2 placeholder:text-white"
            />
            <Button size="icon" type="submit">
                <SendHorizontal />
            </Button>
        </form>
    );
};

export default CommentInput;