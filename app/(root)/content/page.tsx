import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
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
        imageSrc: '/image.png',
        buttonText: 'Explore Stories',
        count: '500+',
        href: 'themed-tales'
    },
    {
        id: 2,
        title: 'Capture Your Daily Moment',
        description: '700+ moments shared and counting!',
        imageSrc: '/image2.png',
        buttonText: 'Explore Moments',
        count: '700+',
        href: 'daily-moments'
    },
    {
        id: 3,
        title: 'Share Anonymous Confessions',
        description: 'Your thoughts, worries, or questions - shared with the community, anonymously.',
        imageSrc: '/image copy.png',
        buttonText: 'Explore Confessions',
        count: 'Anonymous',
        href: 'anonymous-confessions'
    }
]

const Page = () => {
    return (
        <div className='flex gap-2 w-full h-full items-center justify-center text-center'>
            {contentData.map((content) => (
                <Card key={content.id} className='h-[600px] w-[340px] relative overflow-hidden'>
                    <Image
                        className='w-full h-full object-cover'
                        width={500}
                        height={500}
                        src={content.imageSrc}
                        alt='Background Image'
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-5 text-white">
                        <div className="">
                            <CardHeader className='font-bold text-2xl flex items-center justify-center p-2'>
                                <p className='w-60'>{content.title}</p>
                            </CardHeader>
                            <CardDescription className='text-xs font-semibold text-white'>
                                <p className='max-w-md'>{content.description}</p>
                            </CardDescription>
                        </div>
                        <CardFooter className='flex items-center justify-center'>
                            <Link href={`/content/${content.href}`}>
                                <Button className='bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600'>
                                    {content.buttonText}
                                </Button>
                            </Link>
                        </CardFooter>
                    </div>
                </Card>
            ))}
        </div>
    )
}

export default Page