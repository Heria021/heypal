"use client"
import ConversationContainer from '@/components/shared/conversation/ConversationContainer'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import Header from './_components/Header'
import Body from './_components/body/Body'
import ChatInput from './_components/input/ChatInput'

import { use } from "react";
import RemoveFriendDialog from './_components/dialogs/RemoveFriendDialog'
import { useMutationState } from '@/hooks/useMutationState'
import ProfileContainer from '@/components/shared/conversation/ProfileContainer'
import Emotion from './_components/reaction/Emotion'
import UserInformation from './_components/details/UserInformation'
import GroupInformation from './_components/details/GroupInformation'
import Empty from './_components/features/Empty'

type Props = {
  params: Promise<{
    conversationId: Id<"conversations">;
  }>;
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

const ConversationPage = ({ params }: Props) => {
  const { conversationId } = use(params);

  const conversation = useQuery(api.conversation.get, { id: conversationId });

  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeteleGroupDialogOpen] = useState(false);
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);
  const [callType, setCallType] = useState<"audio" | "video" | null>();

  const [user, setUser] = useState<UserProfile>();
  const { mutate: getUser } = useMutationState(api.profile.getUserById);

  const group = useQuery(api.profile.getGroupById, { conversationsId: conversationId });

  const clearUser = () => {
    setUser(undefined);
  };

  const handleAvatarClick = (userId: Id<"users">) => {
    getUser({ userId }).then((data) => {
      setUser(data);
    });
    console.log(userId)
  };

  return conversation === undefined ? (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 />
    </div>
  ) : conversation === null ? (
    <p className="w-full h-full flex items-center justify-center">
      Conversation not found
    </p>
  ) : (
    <>
      <ConversationContainer>
        <RemoveFriendDialog conversationId={conversationId} open={removeFriendDialogOpen} setOpen={setRemoveFriendDialogOpen}></RemoveFriendDialog>
        <Header
          clearUser={clearUser}
          imageUrl={conversation.isGroup ? undefined : conversation?.otherMember?.imageUrl}
          name={(conversation.isGroup ? conversation.name : conversation?.otherMember?.username) || ""}
          options={conversation.isGroup ?
            [{ label: "Leave group", destructive: false, onClick: () => setLeaveGroupDialogOpen(true) },
            { label: "Delete group", destructive: true, onClick: () => setDeteleGroupDialogOpen(true) }]
            :
            [{ label: "Remove friend", destructive: true, onClick: () => setRemoveFriendDialogOpen(true) }]
          }
        />
        <Body handleAvatarClick={handleAvatarClick} />
        <ChatInput />
      </ConversationContainer>
      <ProfileContainer>
        <Emotion />
        {user || !conversation.isGroup ? '' : <GroupInformation groups={group} />}
        <UserInformation data={user} />
        <Empty/>
      </ProfileContainer>
    </>
  );
};

export default ConversationPage;