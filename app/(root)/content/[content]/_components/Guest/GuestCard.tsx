import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Heart, MessageSquareMore, Share2Icon } from 'lucide-react';
import CommentInput from '../Shared/CommentInput';
import { Id } from '@/convex/_generated/dataModel';
import Comments from './Comment';

type GuestCardProps = {
    postId: Id<'post'>;
    userName: string;
    postTitle: string;
    postContent: string;
    postLikes: number;
};

const GuestCard = ({ userName, postTitle, postContent, postLikes, postId }: GuestCardProps) => {
    const [openComment, setOpenComment] = useState(false);

    const toggleComment = () => {
        setOpenComment(prevState => !prevState);
    };

    return (
        <Card className="w-full relative overflow-hidden space-y-4 rounded-lg shadow-lg bg-blue-500/50">
            <CardHeader className="pb-0">
                <div className="flex flex-row gap-2 items-center justify-start">
                    <Image src={'/image8.png'} width={500} height={500} className="h-10 w-10 rounded-full overflow-hidden" alt={''} />
                    <div className="flex flex-col">
                        <p className="font-medium text-sm">{userName}</p>
                        <p className="font-medium text-muted-foreground text-xs">Posted on 7 Jan, 2025</p>
                    </div>
                </div>
                <CardTitle className="text-base mb-0">{postTitle}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2 px-6 overflow-auto max-h-48 no-scrollbar">
                <p>{postContent}</p>
                <p>{postContent}</p>
                <p>{postContent}</p>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
                <div className="flex flex-row items-start gap-8">
                    <div className="px-4 py-1 bg-gray-400/40 rounded-sm cursor-pointer flex gap-2 items-center">
                        <Heart size={20} />
                        <span className="text-xs">{postLikes}</span>
                    </div>
                    <div className="px-4 py-1 bg-gray-400/40 rounded-sm cursor-pointer flex gap-2 items-center" onClick={toggleComment}>
                        <MessageSquareMore size={20} />
                        <span className="text-xs">{postLikes}</span>
                    </div>
                    <div className="px-4 py-1 bg-gray-400/40 rounded-sm cursor-pointer flex gap-2 items-center">
                        <Share2Icon size={20} />
                    </div>
                </div>
                {openComment && <CommentInput postId={postId} />}
                {openComment && <Comments postId={postId} />}
            </CardFooter>
        </Card>
    );
};

export default GuestCard;