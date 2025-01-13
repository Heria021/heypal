import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const get = query({
    args: {
        id: v.id("conversations")
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("Unauthorized");
        }

        const currentUser = await getUserByClerkId({
            ctx,
            clerkId: identity.subject,
        });

        if (!currentUser) {
            throw new ConvexError("User not found");
        }

        const conversation = await ctx.db.get(args.id);

        if (!conversation) {
            throw new ConvexError("conversation not found!");
        }

        const membership = await ctx.db.query("conversationMembers").withIndex("by_memberId_conversationId", (q) => q.eq("memberId", currentUser._id).eq("conversationId", args.id)).unique();

        if (!membership) {
            throw new ConvexError("You aren't part of this conversation");
        }

        const allConversationMemberships = await ctx.db.query("conversationMembers").withIndex("by_conversationId", (q) => q.eq("conversationId", args.id)).collect();

        if (!conversation.isGroup) {
            const ontherMembership = allConversationMemberships.filter(membership => membership.memberId !== currentUser._id)[0]
            const otherMemberDetails = await ctx.db.get(ontherMembership.memberId);

            return {
                ...conversation,
                otherMember: {
                    ...otherMemberDetails,
                    lastSeenMessageId: ontherMembership.lastSeenMessage
                },
                otherMembers: null
            }
        } else {
            const otherMembers = (await Promise.all(allConversationMemberships.filter(membership => membership.memberId == currentUser._id).map(async membership => {
                const member = await ctx.db.get(membership.memberId);
                if (!member) {
                    throw new ConvexError("Member could not be found")
                }
                return member;
            })))
            return { ...conversation, otherMembers, otherMember: null }
        }
    },
});


export const createGroup = mutation({
    args: {
        members: v.array(v.id("users")),
        name: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("Unauthorized");
        }

        const currentUser = await getUserByClerkId({
            ctx,
            clerkId: identity.subject,
        });

        if (!currentUser) {
            throw new ConvexError("User not found");
        };

        const conversationId = await ctx.db.insert("conversations", { isGroup: true, name: args.name });

        await Promise.all([...args.members, currentUser._id].map(async (memberId) => {
            await ctx.db.insert("conversationMembers", {
                memberId,
                conversationId,
            })
        }))

    },
});

//createGroupMember
export const createGroupMember = mutation({
    args: {
        conversationId: v.id('conversations'),
    },
    handler: async (ctx, args) => {
        const { conversationId } = args;

        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("Unauthorized");
        }

        const currentUser = await getUserByClerkId({
            ctx,
            clerkId: identity.subject,
        });

        if (!currentUser) {
            throw new ConvexError("User not found");
        }

        const conversation = await ctx.db.get(conversationId);
        if (!conversation) {
            throw new ConvexError("Conversation not found");
        }

        const existingMember = await ctx.db.query("conversationMembers").withIndex('by_memberId_conversationId', (q) => q.eq('memberId', currentUser._id).eq('conversationId', conversationId)).first();

        if (existingMember) {
            return { success: true };
        }

        const joinGroup = await ctx.db.insert("conversationMembers", { memberId: currentUser._id, conversationId });

        if (!joinGroup) {
            throw new ConvexError('Failed to join group');
        }

        return { success: true };
    },
});
