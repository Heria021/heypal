"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Cat, Edit, Heart, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const UserInformation = (props: Props) => {
    const user = useQuery(api.profile.get);

    const userName = user?.name || "Guest User";
    const userPicture = user?.pictureUrl || "";

    return (
        <Card className="max-w-sm h-auto text-primary shadow-lg rounded-3xl p-5">
            <CardHeader className="flex flex-row justify-between items-center">
                <Link href={''}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-2 rounded-md">
                                <Edit className=" w-5 h-5"/>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            Edit Profile
                        </TooltipContent>
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
                    <TooltipContent>
                        Switch Account
                    </TooltipContent>
                    </Tooltip>
                </Link>

            </CardHeader>
            <CardContent className=" flex flex-col items-center">
                <div className="w-52 h-52 rounded-full shadow-gray-400 shadow-lg overflow-hidden">
                    <Avatar className="w-full h-full">
                        <AvatarImage src={userPicture} alt="User Picture" />
                        <AvatarFallback>
                            <UserRound className="w-full h-full text-muted-foreground" />
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="mt-5 space-y-5">
                    <div className="text-lg text-center font-semibold">
                        Welcome <span className="">{userName}</span>
                    </div>
                    <div className="text-sm">
                        <p className="font-bold">About</p>
                        <p className="text-muted-foreground text-sm">
                            This is a default about section. You can customize this information.
                        </p>
                    </div>
                    <div className="text-sm">
                        <p className="font-bold">Interests</p>
                        <p className="text-muted-foreground text-sm">
                            This is a default interest section. You can update your interests here.
                        </p>
                    </div>
                </div>
            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card>
    
    );
};

export default UserInformation;