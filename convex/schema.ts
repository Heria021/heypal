import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        username: v.string(),
        imageUrl: v.string(),
        clerkId: v.string(),
        email: v.string(),
        content: v.boolean(),
    })
    .index("by_email", ["email"])
    .index("by_username", ["username"]) 
    .index("by_clerkId", ["clerkId"]),

    userProfile: defineTable({
        userId: v.id("users"),
        pals: v.number(),                
        interests: v.array(v.string()),  
        bio: v.string(),
        about: v.string(),
        gender: v.optional(v.union(v.literal("Male"), v.literal("Female"))),
        dob: v.optional(v.string()),
        mood_status: v.string(),         
        online_status: v.string()        
    })
    .index("by_userId", ['userId']),

    guestProfile: defineTable({
        userId: v.id("users"),        
        userName: v.string(),
        imageUrl: v.string(),
        bio: v.string(),
    })
    .index("by_userId", ['userId']),

    userPosts: defineTable({
        userId: v.id("users"),
        postId: v.id("post"),
    })
    .index("by_userId", ['userId']),

    guestPost: defineTable({
        userId: v.id("users"),
        postId: v.id("post"),
    })
    .index("by_userId", ['userId']),
    
    post: defineTable({
        title: v.string(),
        content: v.string(),
        theme: v.string(),
        likes: v.number(),
        category: v.string(),
        tags: v.array(v.string())
    }),

    comment: defineTable({
        userId: v.id('users'),
        postId: v.id("post"),
        comment: v.string(),
        user_tag: v.optional(v.id('users'))
    })
    .index("by_postId", ['postId']),

    groupDetails: defineTable({
        conversationsId: v.id('conversations'),
        admins: v.array(v.id('users')),  
        imageUrl: v.string(),
        features: v.array(v.string()),  
        bio: v.string(),
        about: v.string(),          
    })
    .index("by_conversationId", ['conversationsId']),

    request: defineTable({
        sender: v.id("users"),
        receiver: v.id("users")
    })
    .index("by_receiver", ["receiver"])
    .index("by_receiver_sender", ["receiver", "sender"]),

    friends: defineTable({
        user1: v.id("users"),
        user2: v.id("users"),
        conversationId: v.id("conversations")
    })
    .index("by_user1", ['user1'])
    .index("by_user2", ['user2'])
    .index("by_conversationId", ['conversationId']),

    conversations:defineTable({
        name: v.optional(v.string()),
        isGroup: v.boolean(),
        lastMessageId: v.optional(v.id("messages")),
    })
    .index("by_group", ["isGroup"]),

    conversationMembers: defineTable({
        memberId: v.id("users"),
        conversationId: v.id("conversations"),
        lastSeenMessage: v.optional(v.id("messages"),)
    })
    .index("by_memberId", ['memberId'])
    .index("by_conversationId", ['conversationId'])
    .index("by_memberId_conversationId", ['memberId' ,'conversationId']),

    messages: defineTable({
        senderId: v.id("users"),
        conversationId: v.id("conversations"),
        type: v.string(),
        content: v.array(v.string()),
    })
    .index("by_conversationId", ['conversationId'])
    
});