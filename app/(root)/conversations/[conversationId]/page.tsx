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
import UserInformation from '../../home/_components/UserInformation'

type Props = {
  params: Promise<{
    conversationId: Id<"conversations">;
  }>;
};

const ConversationPage = ({ params }: Props) => {
  const { conversationId } = use(params);

  const conversation = useQuery(api.conversation.get, { id: conversationId });

  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeteleGroupDialogOpen] = useState(false);
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);
  const [callType, setCallType] = useState<"audio" | "video" | null>();

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
          imageUrl={conversation.isGroup ? undefined : conversation?.otherMember?.imageUrl}
          name={(conversation.isGroup ? conversation.name : conversation?.otherMember?.username) || ""}
          options={conversation.isGroup ?
            [{ label: "Leave group", destructive: false, onClick: () => setLeaveGroupDialogOpen(true) },
            { label: "Delete group", destructive: true, onClick: () => setDeteleGroupDialogOpen(true) }]
            :
            [{ label: "Remove friend", destructive: true, onClick: () => setRemoveFriendDialogOpen(true) }]
          }
        />
        <Body />
        <ChatInput />
      </ConversationContainer>
      <UserInformation />
    </>

  );
};

export default ConversationPage;