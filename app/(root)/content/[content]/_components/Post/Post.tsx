'use client';
import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import PostCard from './PostCard';
import { CreatePost } from '../Shared/CreatePost';


const Post = () => {
    const userPosts = useQuery(api.posts.get);

    if (!userPosts) {
        return <></>;
    }

    return (
        <div className="w-full h-full overflow-auto no-scrollbar">
            <div className="w-full flex flex-col space-y-2 max-w-3xl mx-auto">
                {userPosts.map((userPost, index) => (
                    <PostCard key={index} userPost={userPost} />
                ))}
            </div>
        </div>
    );
};

export default Post;