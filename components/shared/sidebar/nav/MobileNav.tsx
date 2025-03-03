"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigation } from '@/hooks/useNavigation'
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react'

const MobileNav = () => {
    const paths = useNavigation();

    return (
        <Card className='fixed bottom-4 lg:hidden h-16 p-2 flex items-center w-[calc(100vw-32px)]'>
            <nav className=' w-full'>
                <ul className='flex justify-evenly items-center gap-4'>
                    {paths.map((path, id) => {
                        return (
                            <li key={id}>
                                <Link href={path.href}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                size={'icon'}
                                                variant={path.active ? "default" : "outline"}
                                            >
                                                {path.icon}
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {path.name}
                                        </TooltipContent>
                                    </Tooltip>
                                </Link>
                            </li>
                        )
                    })}
                    <li>
                        <UserButton />
                    </li>
                </ul>
            </nav>
        </Card>
    )
}

export default MobileNav