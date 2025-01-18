"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/convex/_generated/api";
import { useMutationState } from "@/hooks/useMutationState";
import { useQuery } from "convex/react";
import { ConvexError } from "convex/values";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import UserProfile from "./_components/Edit/UserProfile";

const Page = () => {
  const router = useRouter();
  const data = useQuery(api.conversations.getGroupsAndFriends);
  const { mutate: createGroupMember, pending} = useMutationState(api.conversation.createGroupMember);
  if (!data) {
    return <div>Loading...</div>;
  }

  const handleConversationClick = async (
    conversationId: string,
  ) => {
    await createGroupMember({ conversationId}).then(() => {
        toast.success("Group Joined");
        router.push(`/conversations/${conversationId}`);

    }).catch((error) => {
        toast.error(error instanceof ConvexError ? error.data : "Unexpected error occurred");
    });
};

  return (
    // <UserProfile/>
    <div className="w-full h-auto px-4">
      <div className="w-full p-6 space-y-6">
        <h2 className="text-xl font-semibold">Popular Groups</h2>
        <div className="space-y-1 max-h-56 p-4 overflow-auto no-scrollbar">
          {data.groupConvs.map((conversation, index) => (
            <div
              key={index}
              onClick={(e) => handleConversationClick( conversation.conversation._id)}
              className="block w-full"
            >
              <div className="flex flex-row items-center gap-4 p-2 rounded-full hover:shadow-gray-300 hover:shadow-md hover:bg-white transition">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>
                    {conversation.conversation.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col truncate">
                  <h4 className="truncate font-medium">
                    {conversation.conversation.name || "-"}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full p-6 space-y-6">
        <h2 className="text-xl font-semibold">Your Friends</h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 p-4">
          {data.friendConvs.length > 0 ? (
            data.friendConvs.map((conversation, index) => (
              <div className="flex flex-row items-center gap-1 p-2" key={index}>
                <Link
                  href={`/conversations/${conversation.conversation._id}`}
                  className="mr-2"
                >
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={conversation.otherMembers?.imageUrl} />
                    <AvatarFallback>
                      {conversation.otherMembers?.username?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex flex-col truncate">
                  <h4 className="truncate font-medium text-lg">
                    {conversation.otherMembers?.username || "Unknown"}
                  </h4>
                  <p className="truncate text-sm text-gray-600">
                    {conversation.lastMessage?.content || "No messages yet"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No friend conversations available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;