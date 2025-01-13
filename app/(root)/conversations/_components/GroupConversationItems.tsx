import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Id } from '@/convex/_generated/dataModel'
import { User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    id: Id<"conversations">;
    name: string;
    lastMessageSender?: string;
    lastMessageContent?: string
}

const GroupConversationItem = ({ id, name, lastMessageContent, lastMessageSender }: Props) => {
    return (
        <Link href={`/conversations/${id}`} className='w-full'>
            <Card className='flex flex-row items-center gap-4 p-2 truncate'>
                <div className=" flex flex-row items-center gap-4 truncate">
                    <Avatar>
                        <AvatarFallback>{name.charAt(0).toLocaleUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className=" flex flex-col truncate">
                        <h4 className=' truncate'>{name}</h4>
                        {
                            lastMessageSender && lastMessageContent ?
                                <span className=' text-xs text-muted-foreground flex truncate overflow-ellipsis'>
                                    <p className="font-semibold">
                                        {lastMessageSender}:
                                        &nbsp;
                                    </p>
                                    <p className=" truncate text-xs text-muted-foreground">
                                        {lastMessageContent}
                                    </p>
                                </span>
                                :
                                <p className=' text-sm text-muted-foreground truncate'>Start the conversation!</p>

                        }
                    </div>
                </div>
            </Card>
        </Link>
    )
}

export default GroupConversationItem