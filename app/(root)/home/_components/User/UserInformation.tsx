"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Cat, Edit, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";
import MoodStatusForm from "./MoodStatusForm";

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

const UserInformation = () => {
    const user = useQuery(api.profile.get) as UserProfile;

    return (
        <Card className="max-w-sm h-auto text-primary shadow-lg rounded-3xl p-2">
            <CardHeader className="flex flex-row justify-between items-center">
                <Link href={''}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-2 rounded-md">
                                <Edit className="w-5 h-5" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>Edit Profile</TooltipContent>
                    </Tooltip>
                </Link>
                <div>
                    <p className="text-2xl font-bold pt-5">Discover</p>
                </div>
                <Link href={''}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-2 rounded-md">
                                <Cat className="w-5 h-5" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>Switch Account</TooltipContent>
                    </Tooltip>
                </Link>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                <div className="w-52 h-52 rounded-full shadow-gray-400 shadow-lg relative">
                    {/* <div className="absolute top-6 -right-12 z-10">
                        <div className="max-w-28 inline-flex items-center rounded-md border border-primary-foreground px-0.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-primary text-primary-foreground shadow">
                            <MoodStatusForm
                                moodStatus={user?.mood_status || ""}
                                userId={user?._id || ""}
                            />
                        </div>
                    </div> */}
                    <Avatar className="w-full h-full ">
                        <AvatarImage src={user?.imageUrl} alt="User Picture" />
                    </Avatar>
                </div>
                <div className="mt-5 space-y-5">
                    <div className="text-center">
                        <div className="font-semibold text-lg">
                            Welcome <span>{user?.username}</span>
                        </div>
                        <div className="text-xs text-primary">{user?.bio}</div>
                    </div>
                    <div className="text-sm space-y-1">
                        <p className="font-bold">About</p>
                        <p className="text-card-foreground leading-snug text-sm">
                            {user?.about}
                        </p>
                    </div>
                    <div className="text-sm space-y-1">
                        <p className="font-bold">Interests</p>
                        <div>
                            {user?.interests.map((interest, index) => (
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