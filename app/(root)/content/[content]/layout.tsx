'use client'
import React from 'react';
import Themes from './_components/Sidebar.tsx/Themes';
import TrendingUsers from './_components/Sidebar.tsx/TrendingUsers';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ContentHeader from '@/components/shared/contentHeader/contentHeader';
type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div className="w-full h-full flex overflow-auto no-scrollbar">
            <Card className='h-full w-1/4 hidden lg:flex' />

            <ContentHeader title={'Themed Tales'} action>
                {children}
            </ContentHeader>

            <Card className='h-full w-1/4 hidden lg:flex lg:flex-col'>
                <CardHeader className='text-lg font-bold py-2'>
                    Explore Trending Users Posts
                </CardHeader>
                <CardContent className="h-full flex flex-col justify-between overflow-scroll no-scrollbar py-0">
                    <TrendingUsers />
                    <Themes />
                </CardContent>
            </Card>
        </div>
    );
};

export default Layout;