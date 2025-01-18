"use client"
import ItemList from '@/components/shared/itemList/itemList';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import React from 'react';
import DMConversationItem from './_components/DMConversationItem';
import CreateGroupDialog from './_components/CreateGroupDialog';
import GroupConversationItem from './_components/GroupConversationItems';

type Props = React.PropsWithChildren<{}>;

const layout = ({ children }: Props) => {
  const conversations = useQuery(api.conversations.get);

  return (
    <>
      <ItemList title={'Conversations'} action={<CreateGroupDialog />}>
        {conversations ? (
          conversations.length === 0 ? (
            <p className="w-full h-full flex items-center justify-center">
              No Conversation Found
            </p>
          ) : (
            conversations.map((conversation) => {
              return conversation.conversation.isGroup ? (
                <GroupConversationItem
                  key={conversation.conversation._id}
                  id={conversation.conversation._id}
                  name={conversation.conversation.name || ''}
                  lastMessageContent={conversation.lastMessage?.content}
                  lastMessageSender={conversation.lastMessage?.sender}
                />) : (
                <DMConversationItem
                  key={conversation.conversation._id}
                  id={conversation.conversation._id}
                  imageUrl={conversation.otherMembers?.imageUrl || ''}
                  username={conversation.otherMembers?.username || ''}
                  lastMessageContent={conversation.lastMessage?.content}
                  lastMessageSender={conversation.lastMessage?.sender}
                />
              );
            })
          )
        ) : (
          <p className="w-full h-full flex items-center justify-center">
            Loading Conversations...
          </p>
        )}
      </ItemList>
      {children}
    </>
  );
};

export default layout;