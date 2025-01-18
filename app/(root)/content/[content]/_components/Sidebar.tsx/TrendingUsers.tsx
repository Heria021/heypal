import React from 'react';
import Leaders from './Leaders';

type TrendingUsersUser = {
    id: string;
    imageUrl: string;
    username: string;
    lastMessageSender?: string;
    lastMessageContent?: string;
}

const TrendingUsersUsers: TrendingUsersUser[] = [
    {
        id: "1",
        imageUrl: "/image7.png",
        username: "John Doe",
        lastMessageSender: "John",
        lastMessageContent: "Hey, how's it going?"
    },
    {
        id: "2",
        imageUrl: "/image6.png",
        username: "Jane Smith",
        lastMessageSender: "Jane",
        lastMessageContent: "Looking forward to the meeting."
    },
    {
        id: "3",
        imageUrl: "/image.png",
        username: "Alice Johnson",
        lastMessageSender: "Alice",
        lastMessageContent: "Let's catch up soon."
    },
    {
        id: "4",
        imageUrl: "/image4.png",
        username: "Bob Marley",
        lastMessageSender: "Bob",
        lastMessageContent: "Check out this cool song!"
    },
    {
        id: "5",
        imageUrl: "/image8.png",
        username: "Charlie Brown",
        lastMessageSender: "Charlie",
        lastMessageContent: "Let's do something this weekend."
    },
    {
        id: "6",
        imageUrl: "/image9.png",
        username: "Eva Green",
        lastMessageSender: "Eva",
        lastMessageContent: "Can't wait to see you!"
    }
];

const TrendingUsers = () => {
    return (
        <div className="w-full flex flex-col space-y-2">
            {TrendingUsersUsers.map((user) => (
                <Leaders
                    key={user.id}
                    id={user.id}
                    imageUrl={user.imageUrl}
                    username={user.username}
                    lastMessageSender={user.lastMessageSender}
                    lastMessageContent={user.lastMessageContent}
                />
            ))}
        </div>
    );
}

export default TrendingUsers;