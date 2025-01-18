'use client';
import React, { use } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import GuestCard from './GuestCard';

const Guest = () => {
  const guestPosts = useQuery(api.guests.get);

  if (!guestPosts) {
    return <></>;
  }

  return (
    <div className="w-full h-full overflow-auto no-scrollbar">
      <div className="w-full flex flex-col items-center space-y-4 max-w-3xl mx-auto">
        {guestPosts.map((guestPost, index) => (
          <GuestCard
            key={index}
            userName={guestPost.guest.userName}
            postTitle={guestPost.post.title}
            postContent={guestPost.post.content}
            postLikes={guestPost.post.likes} 
            postId={guestPost.post._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Guest;