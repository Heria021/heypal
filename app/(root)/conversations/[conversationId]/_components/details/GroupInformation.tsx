"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { Cat, Edit, UserRound } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { any } from "zod";

type props = {
    groups : any;
}

const GroupInformation = ({groups}: props) => {
    const { groupInfo, admins, group } = groups

    return (
        <Card className="w-full h-auto text-primary shadow-lg rounded-3xl ">
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
                <div className="w-52 h-52 rounded-full shadow-gray-400 shadow-lg">
                    <Avatar className="w-full h-full ">
                        <AvatarImage src={''} alt="User Picture" />
                    </Avatar>
                </div>
                <div className="mt-5 space-y-5">
                    <div className="text-center">
                        <div className="font-semibold text-lg">
                            Welcome to <span>{group.name}</span>
                        </div>
                        <div className="text-xs text-primary">{groupInfo.bio}</div>
                    </div>
                    <div className="text-sm space-y-1">
                        <p className="font-bold">About</p>
                        <p className="text-card-foreground leading-snug text-sm">
                            {groupInfo.about}
                        </p>
                    </div>
                    <div className="text-sm space-y-1">
                        <p className="font-bold">Interests</p>
                        {/* <div>
                            {data.interests.map((interest, index) => (
                                <Badge key={index} variant="outline" className="text-card-foreground rounded-full mr-2">
                                    {interest}
                                </Badge>
                            ))}
                        </div> */}
                    </div>
                </div>
            </CardContent>
            <CardFooter></CardFooter>
        </Card>

    )
}

export default GroupInformation