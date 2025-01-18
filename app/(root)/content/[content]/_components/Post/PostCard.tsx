
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bookmark, Heart, Share2Icon } from 'lucide-react';
import Image from 'next/image';
import Comments from './Comments';
import { Id } from '@/convex/_generated/dataModel';
import CommentInput from '../Shared/CommentInput';

export type PostWithUser = {
    post: {
        _creationTime: number;
        _id: Id<'post'>;
        category: string;
        content: string;
        likes: number;
        tags: string[];
        theme: string;
        title: string;
    };
    user: {
        _creationTime: number;
        _id: string;
        clerkId: string;
        content: boolean;
        email: string;
        imageUrl: string;
        username: string;
    };
};

const PostCard: React.FC<{ userPost: PostWithUser }> = ({ userPost }) => {
    const [message, setMessage] = useState("");
    const [openComment, setOpenComment] = useState(false);

    const toggleComment = () => {
        setOpenComment(prevState => !prevState);
    };

    return (
        <Card className="w-full relative overflow-hidden rounded-lg shadow-lg">
            <div className="absolute inset-0">
                <Image
                    src={'/image7.png'}
                    alt={userPost.post.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                />
            </div>
            <div className="relative z-10 bg-black bg-opacity-50 p-4 text-white flex flex-col gap-4 justify-between h-full">
                <CardHeader className=" py-0">
                    <CardTitle className="text-2xl font-semibold">{userPost.post.title}</CardTitle>
                    <CardDescription className="text-sm flex justify-between items-center text-white">
                        <div className="flex gap-2 items-center">
                            <Image
                                src={userPost.user.imageUrl}
                                width={40}
                                height={40}
                                alt={userPost.user.username}
                                className="h-10 w-10 rounded-full border border-white"
                            />
                            <div>
                                <p className="font-semibold text-base">{userPost.user.username}</p>
                                <p className="text-xs">Category: {userPost.post.category}</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-center">
                            <Heart /> <Bookmark /> <Share2Icon />
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-sm space-y-2 px-6 overflow-auto max-h-52">
                    <p>{userPost.post.content}</p>
                    <p>{userPost.post.content}</p>
                </CardContent>
                <CardFooter className="flex flex-col items-start space-y-1">
                    <CommentInput postId={userPost.post._id} />
                    <span onClick={toggleComment} className=' text-sm cursor-pointer'>see comments</span>
                    {openComment && <Comments postId={userPost.post._id} />}
                </CardFooter>
            </div>
        </Card>
    );
};

export default PostCard;