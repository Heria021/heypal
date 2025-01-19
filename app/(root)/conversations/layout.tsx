"use client"
import ItemList from '@/components/shared/itemList/itemList';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import React from 'react';
import DMConversationItem from './_components/DMConversationItem';
import GroupConversationItem from './_components/GroupConversationItems';
import AddFriendDialog from '../friends/components/AddFriendDialog';
import CreateGroupDialog from './_components/CreateGroupDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Request from './_components/Request';

type Props = React.PropsWithChildren<{}>;

const layout = ({ children }: Props) => {
  const conversations = useQuery(api.conversations.get);
  const requests = useQuery(api.requests.getAllRequests);

  return (
    <>
      <ItemList title={'Conversations'} action={[<AddFriendDialog />, <CreateGroupDialog />]}>
        <Tabs defaultValue="friends" className="w-full h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="friends" className=' flex flex-col w-full gap-2'>
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
              <></>
            )}
          </TabsContent>
          <TabsContent value="requests">
            {requests === undefined ? (
              <p className="w-full h-full flex items-center justify-center">Loading...</p>
            ) : requests.length === 0 ? (
              <></>
            ) : (
              requests.map((request) => (
                <Request
                  key={request.request._id}
                  id={request.request._id}
                  imageUrl={request.sender.imageUrl}
                  userName={request.sender.username}
                  email={request.sender.email}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </ItemList>
      {children}
    </>
  );
};

export default layout;