import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

type Props = {}

const Emotion = (props: Props) => {
    return (
        <Card className="w-full text-sm rounded-3xl p-2 bg-[#F4F1EB]">
            <CardContent className="w-full flex items-center gap-4 p-2">
                <div className="h-12 w-12">
                    <video
                        className="h-full w-full rounded-xl object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        src="/sad.mp4"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="">
                    <p className="text-card-foreground text-sm font-bold">Depressed</p>
                    <p className=" font-medium text-sm">Let's listen good music!</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default Emotion