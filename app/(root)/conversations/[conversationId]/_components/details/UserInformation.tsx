"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Cat, Edit, UserRound } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
    data?: UserProfile
};

interface UserProfile {
    _creationTime: number;
    _id: string;
    clerkId: string;
    content: boolean;
    email: string;
    imageUrl: string;
    username: string;
    about: string;
    bio: string;
    interests: string[];
    mood_status: string;
    online_status: string;
    pals: number;
    userId: string;
}

const UserInformation = ({ data }: Props) => {
    if (!data) {
        return <></>
    }
    return (
        <Card className="w-full h-auto text-primary shadow-none rounded-3xl ">
            <CardHeader className=" p-4">

            </CardHeader>
            <CardContent className="flex flex-col items-center">
                <div className="w-52 h-52 rounded-full shadow-gray-400 shadow-lg relative">
                    {/* <div className="absolute top-6 -right-12 z-10">
                        <div className="max-w-28 inline-flex rounded-2xl overflow-hidden items-center border border-primary-foreground px-0.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-primary text-primary-foreground shadow">
                            <Badge className="p-0.5 ">{data.mood_status}</Badge>
                        </div>
                    </div> */}
                    <Avatar className="w-full h-full ">
                        <AvatarImage src={data.imageUrl} alt="User Picture" />
                        <AvatarFallback>
                            <UserRound className="w-full h-full text-muted-foreground" />
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="mt-5 space-y-2">
                    <div className="text-center">
                        <div className="font-semibold text-lg">
                            Welcome <span>{data.username}</span>
                        </div>
                        <div className="text-xs text-primary">{data.bio}</div>
                    </div>
                    <div className="grid grid-cols-2 w-full gap-2 font-normal">
                        <Button className=" font-normal w-full">Send Request</Button>
                        <Button className=" font-normal w-full">Visit Profile</Button>
                    </div>
                    <div className="text-sm space-y-1">
                        <p className="font-bold">About</p>
                        <p className="text-card-foreground text-xs leading-tight">
                            {data.about}
                        </p>
                    </div>
                    <div className="text-sm flex gap-8 items-center">
                        <div className="">
                            <p className="font-bold">Gender</p>
                            <p className="text-card-foreground text-xs leading-tight">
                                Male
                            </p>
                        </div>
                        <div className="">
                            <p className="font-bold">Date of Birth</p>
                            <p className="text-card-foreground text-xs leading-tight">
                                5 Jan, 2018
                            </p>
                        </div>
                    </div>
                    <div className="text-sm space-y-1">
                        <p className="font-bold">Interests</p>
                        <div>
                            {data.interests.map((interest, index) => (
                                <Badge key={index} variant="outline" className="text-card-foreground rounded-full mr-2">
                                    {interest}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter></CardFooter>
        </Card>

    );
};

export default UserInformation;