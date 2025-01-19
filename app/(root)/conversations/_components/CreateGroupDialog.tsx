import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { api } from '@/convex/_generated/api';
import { useMutationState } from '@/hooks/useMutationState';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar } from '@radix-ui/react-avatar';
import { Dialog } from '@radix-ui/react-dialog';
import { useQuery } from 'convex/react';
import { ConvexError } from 'convex/values';
import { CirclePlus, X } from 'lucide-react';
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod'

type Props = {}

const createGroupFormSchema = z.object({
    name: z.string().min(1, { message: "This field can't be empty" }),
    members: z.string().array().min(1, { message: "You must select at least 1 friend" }),
});

const CreateGroupDialog = (props: Props) => {
    const friends = useQuery(api.friends.get);
    const { mutate: createGroup, pending } = useMutationState(api.conversation.createGroup)

    const form = useForm<z.infer<typeof createGroupFormSchema>>({
        resolver: zodResolver(createGroupFormSchema),
        defaultValues: {
            name: "",
            members: [],
        }
    })

    const members = form.watch("members", []);

    const unselectedFriends = useMemo(() => {
        return friends ? friends.filter(friend => !members.includes(friend._id)) : [];
    }, [friends?.length, members.length]);

    const handleSubmit = async (values: z.infer<typeof createGroupFormSchema>) => {
        await createGroup({ name: values.name, members: values.members }).then(() => {
            form.reset();
            toast.success("Group created");
        }).catch((error) => {
            toast.error(error instanceof ConvexError ? error.data : "Unexpected error occurred");
        });
    };

    return (
        <Dialog>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button size={'lg'} variant={'outline'} className=' flex items-center space-x-2'>
                            <CirclePlus />
                            <span>Add Group</span>
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Create Group</p>
                </TooltipContent>
            </Tooltip>
            <DialogContent className='block'>
                <DialogHeader>
                    <DialogTitle>Create Group</DialogTitle>
                    <DialogDescription>Add your friends to get started!</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='Group name ...' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="members" render={() => (
                            <FormItem>
                                <FormLabel>Friends</FormLabel>
                                <FormControl>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild disabled={unselectedFriends.length === 0}>
                                            <Button className='w-full' variant={'outline'}>Select</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className='w-full'>
                                            {unselectedFriends.map((friend, index) => (
                                                <DropdownMenuCheckboxItem
                                                    key={index}
                                                    className='flex items-center gap-2 w-full p-2'
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            form.setValue("members", [...members, friend._id]);
                                                        } else {
                                                            form.setValue("members", members.filter(id => id !== friend._id));
                                                        }
                                                    }}
                                                >
                                                    <Avatar>

                                                    <AvatarImage className='w-8 h-8 rounded-full' src={friend.imageUrl} />
                                                    <AvatarFallback>{friend.username.substring(0, 1)}</AvatarFallback>
                                                    </Avatar>
                                                    <h4 className='truncate'>{friend.username}</h4>
                                                </DropdownMenuCheckboxItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {members && members.length ? (
                            <Card className='flex items-center gap-3 overflow-x-auto w-full h-2/4 p-2 no-scrollbar'>
                                {friends?.filter(friend => members.includes(friend._id)).map((friend, index) => (
                                    <div className="flex flex-col items-center gap-1 p-2" key={index}>
                                        <div className="relative">
                                            <Avatar>
                                                <AvatarImage className='w-8 h-8 rounded-full' src={friend.imageUrl} />
                                                <AvatarFallback>{friend.username.substring(0, 1)}</AvatarFallback>
                                            </Avatar>
                                            <X
                                                className='text-muted-foreground w-3 h-3 absolute bottom-6 left-5 bg-muted rounded-full cursor-pointer'
                                                onClick={() => form.setValue("members", members.filter(id => id !== friend._id))}
                                            />
                                        </div>
                                        <h4 className='truncate text-sm'>{friend.username.split(" ")[0]}</h4>
                                    </div>
                                ))}
                            </Card>
                        ) : null}
                        <DialogFooter>
                            <Button type="submit" disabled={pending}>
                                {pending ? "Creating..." : "Create Group"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateGroupDialog;