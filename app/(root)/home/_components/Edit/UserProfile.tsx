import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ActivitySquareIcon, X } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

type Props = {};

const requestSchema = z.object({
    about: z.string().nonempty({ message: "About is required" }),
    bio: z.string().nonempty({ message: "Bio is required" }),
    interests: z.array(z.string()).nonempty({ message: "At least one interest is required" }),
});

const UserProfile: React.FC<Props> = (props) => {
    const [interests, setInterests] = useState<string[]>([]);
    const [currentInterest, setCurrentInterest] = useState<string>("");

    const requestForm = useForm<FieldValues>({
        resolver: zodResolver(requestSchema),
        defaultValues: {
            about: "",
            bio: "",
            interests: [],
        },
    });

    const handleInterestKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && currentInterest.trim()) {
            e.preventDefault();
            setInterests((prevInterests) => [...prevInterests, currentInterest.trim()]);
            requestForm.setValue("interests", [...interests, currentInterest.trim()]);
            setCurrentInterest("");
        }
    };

    const handleRemoveInterest = (index: number) => {
        const updatedInterests = interests.filter((_, i) => i !== index);
        setInterests(updatedInterests);
        requestForm.setValue("interests", updatedInterests);
    };

    const handleRequest: SubmitHandler<FieldValues> = async (data) => {
        try {
            console.log("Form Data:", data);
            toast.success("Success!", {
                description: "Your information has been submitted successfully.",
            });
            requestForm.reset();
            setInterests([]);
        } catch (error: any) {
            console.error("Error during form submission:", error);
            toast.error(error.message || 'Failed to process request');
        }
    };

    return (
        <Card className="border-none shadow-none max-w-2xl">
            <CardHeader className="p-4 bg-card rounded-lg">
                <p className="text-2xl font-semibold pt-5">Profile Overview</p>
            </CardHeader>
            <hr className="px-4" />
            <CardContent className="py-6 ">
                <Form {...requestForm}>
                    <form onSubmit={requestForm.handleSubmit(handleRequest)} className="grid gap-4">
                        {/* About Field */}
                        <FormField
                            control={requestForm.control}
                            name="about"
                            render={({ field }) => (
                                <FormItem className="flex flex-row justify-between items-center">
                                    <div className="flex-1 p-2">
                                        <FormLabel>About</FormLabel>
                                        <FormDescription>Provide a brief description about yourself.</FormDescription>
                                    </div>
                                    <div className="flex-1 p-2">
                                        <FormControl>
                                            <TextareaAutosize
                                                {...field}
                                                placeholder="Write about yourself"
                                                minRows={3}
                                                maxRows={3}
                                                className="flex h-9 w-full resize-none no-scrollbar rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                        <hr className="px-4" />

                        {/* Bio Field */}
                        <FormField
                            control={requestForm.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem className="flex flex-row justify-between items-center">
                                    <div className="flex-1 p-2">
                                        <FormLabel>Bio</FormLabel>
                                        <FormDescription>Write a short biography.</FormDescription>
                                    </div>
                                    <div className="flex-1 p-2">
                                        <FormControl>
                                            <TextareaAutosize
                                                {...field}
                                                placeholder="Write your bio"
                                                minRows={3}
                                                maxRows={3}
                                                className="flex h-9 w-full resize-none no-scrollbar rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                        <hr className="px-4" />

                        {/* Interests Field */}
                        <FormField
                            control={requestForm.control}
                            name="interests"
                            render={() => (
                                <FormItem className="flex flex-row justify-between items-center">
                                    <div className="flex-1 p-2">
                                        <FormLabel>Interests</FormLabel>
                                        <FormDescription>Enter your interests (press Enter to add each).</FormDescription>
                                    </div>
                                    <div className="flex-1 p-2">
                                        <FormControl>
                                            <Input
                                                value={currentInterest}
                                                onChange={(e) => setCurrentInterest(e.target.value)}
                                                onKeyDown={handleInterestKeyDown}
                                                placeholder="Add Interests"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                        <div className="mt-2 flex flex-wrap gap-2">
                            {interests.map((interest, index) => (
                                <Badge key={index} variant="outline" className="text-card-foreground text-[13px] rounded-full mr-2">
                                    {interest}
                                    <X
                                        size={14}
                                        strokeWidth={3.4}
                                        className="text-red-800 cursor-pointer ml-2"
                                        onClick={() => handleRemoveInterest(index)}
                                    />
                                </Badge>
                            ))}
                        </div>
                        <hr className="px-4" />

                        <Button type="submit" className="mt-4 rounded-xl">
                            Submit Information
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
export default UserProfile;
