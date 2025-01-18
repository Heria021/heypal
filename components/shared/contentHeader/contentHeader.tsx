"use client"
import { CreatePost } from '@/app/(root)/content/[content]/_components/Shared/CreatePost';
import { useContent } from '@/hooks/useContent';
import React from 'react';

type ContentHeaderProps = {
    action?: React.ReactNode;
    children: React.ReactNode;
    title: string;
};


const ContentHeader = ({ action, children, title }: ContentHeaderProps) => {
    const paths = useContent();
    const currentPath = paths.find((p) => p.active);

    return (
        <div className="w-full relative flex-1 h-full">
            <div className="absolute top-0 left-0 w-full z-10">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <div className="font-bold text-2xl pl-3 ">
                        <h2 className=' font-macondo '>{currentPath?.name}</h2>
                    </div>
                    {action ? <CreatePost /> : null}
                </div>
            </div>
            <div className="pt-12 h-full overflow-auto">
                {children}
            </div>
        </div>
    );
};

export default ContentHeader;