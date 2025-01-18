import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { ArrowRightCircleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type ContentType = {
    id: number;
    title: string;
    description: string;
    imageSrc: string;
    buttonText: string;
    count: string;
    href: string
}

const contentData: ContentType[] = [
    {
        id: 1,
        title: 'Dive into Themed Tales',
        description: '500+ stories and counting!',
        imageSrc: '/image9.png',
        buttonText: 'Explore Stories',
        count: '500+',
        href: 'themed-tales'
    },
    {
        id: 2,
        title: 'Capture Your Daily Moment',
        description: '700+ moments shared and counting!',
        imageSrc: '/image7.png',
        buttonText: 'Explore Moments',
        count: '700+',
        href: 'daily-moments'
    },
    {
        id: 3,
        title: 'Share Anonymous Confessions',
        description: 'Your thoughts, worries, or questions - shared with the community, anonymously.',
        imageSrc: '/image8.png',
        buttonText: 'Explore Confessions',
        count: 'Anonymous',
        href: 'anonymous-confessions'
    }
]

const Themes = () => {
    return (
        <div className='flex flex-col gap-2 w-full h-full py-4 text-center'>
            {contentData.map((content) => (
                <Card key={content.id} className='h-36 w-full relative overflow-hidden'>
                    <Image
                        className='w-full h-full object-cover'
                        width={500}
                        height={500}
                        src={content.imageSrc}
                        alt='Background Image'
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-row justify-between items-center p-2 h-full text-white">
                        <div className="">
                            <CardHeader className='font-bold text-xl flex items-center justify-center p-0'>
                                <p className='w-56'>{content.title}</p>
                            </CardHeader>
                            <CardDescription className='text-xs font-semibold text-white'>
                                <p className='max-w-md px-4'>{content.description}</p>
                            </CardDescription>
                        </div>
                        <CardFooter className='flex items-center justify-center p-0'>
                            <Link href={`/content/${content.href}`}>
                                <Button className='bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600'>
                                    <ArrowRightCircleIcon/>
                                </Button>
                            </Link>
                        </CardFooter>
                    </div>
                </Card>
            ))}
        </div>
    )
}

export default Themes