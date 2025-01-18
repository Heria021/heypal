"use client"
import { Card, CardContent } from '@/components/ui/card';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import Image from 'next/image';
import React from 'react';

type Props = {
  postId: Id<'post'>;
};

const Comments: React.FC<Props> = ({ postId }) => {
  const comments = useQuery(api.posts.comments, { postId });
  console.log(comments);
  if (!comments) {
    return <></>;
  }

  return (
    <Card className="w-full mt-4 shadow-none bg-transparent border-none rounded-none max-h-52 no-scrollbar overflow-auto">
      {comments.map((comment, index) => (
        <CardContent key={index} className="text-sm flex rounded-3xl  items-start gap-2 p-2 mb-2 bg-slate-200/30 ">
          <Image
            src={'/image8.png'}
            width={56}
            height={56}
            alt="User Avatar"
            className="h-10 w-10 rounded-full border border-gray-300"
          />
          <div className="flex-1">
            <p className="font-semibold text-sm text-white">Diggy Grave</p>
            <p className="text-white text-sm">{comment.comment}</p>
          </div>
        </CardContent>
      ))}
    </Card>
  );
};

export default Comments;