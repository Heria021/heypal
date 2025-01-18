import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useConversation } from '@/hooks/useConversation'
import { useQuery } from 'convex/react';
import React from 'react'
import Message from './Message';

type Props = {
    handleAvatarClick: (messageId: Id<"users">) => void;
  };

const Body = ({handleAvatarClick}: Props) => {
    const { conversationId } = useConversation();
    const messages = useQuery(api.messages.get, {
        id: conversationId as Id<"conversations">
    })

    return (
        <div className="flex-1 flex overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar">
            {messages?.map((messageData, index) => {
                const { message, senderImage, senderName, isCurrentUser } = messageData;

                const lastByUser = index > 0 && messages[index - 1].message.senderId === message.senderId;

                return (
                    <Message
                        key={message._id}
                        fromCurrentUser={isCurrentUser} 
                        senderImage={senderImage}
                        senderName={senderName}
                        lastByUser={lastByUser}
                        content={message.content} 
                        createdAt={message._creationTime}
                        type={message.type}
                        onAvatarClick={() => handleAvatarClick(message.senderId)}  
                    />
                );
            })}
        </div>
    )
}

export default Body