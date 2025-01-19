"use client"
import ConversationFallBack from '@/components/shared/conversation/ConversationFallBack'
import ItemList from '@/components/shared/itemList/itemList'
import React from 'react'
import AddFriendDialog from './components/AddFriendDialog'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Request from './components/Request'

type Props = {}

const FriendsPage = (props: Props) => {
  const requests = useQuery(api.requests.getAllRequests);

  return (
    <>
      <ItemList title={'Friends'} action={
        [<AddFriendDialog />]
      }>
        {requests === undefined ? (
          <p className="w-full h-full flex items-center justify-center">Loading...</p>
        ) : requests.length === 0 ? (
          <p className="w-full h-full flex items-center justify-center">
            No Friend Requests Found
          </p>
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
      </ItemList>
      <ConversationFallBack />
    </>
  );
};

export default FriendsPage