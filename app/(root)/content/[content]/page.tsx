'use client';
import React, { use } from 'react';
import Guest from './_components/Guest/Guest';
import Post from './_components/Post/Post';
import { useRouter } from 'next/navigation';

type Props = {
    params: Promise<{
        content: string;
    }>;
};

const Page = ({ params }: Props) => {
    const router = useRouter();
    const { content } = use(params);
    switch (content) {
        case 'anonymous-confessions':
            return <Guest/>
        case 'daily-moments':
            return <div className=""></div>
        case 'themed-tales':
            return <Post />
        default:
            return router.push('/content');
    };
}
export default Page;