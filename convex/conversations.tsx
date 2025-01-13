import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";
import { Id } from "./_generated/dataModel";

export const get = query({
    args: {},
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

        const conversationMemberships = await ctx.db.query("conversationMembers").withIndex("by_memberId", (q) => (q.eq("memberId", currentUser._id))).collect();

        const conversations = Promise.all(conversationMemberships?.map
            (async (membership) => {
                const conversation = await ctx.db.get(membership.conversationId);

                if (!conversation) {
                    throw new ConvexError("Conversation could not be found")
                }

                return conversation;
            })
        );

        const conversationWithDetails = await Promise.all((await conversations).map(async (conversation, index) => {
            const allConversationMemberships = await ctx.db.query("conversationMembers").withIndex("by_conversationId", (q) => q.eq("conversationId", conversation?._id)).collect()
            const lastMessage = await getLastMessageDetails({ ctx, id: conversation.lastMessageId })

            if (conversation.isGroup) {
                return { conversation, lastMessage }
            }
            else {
                const otherMembership = allConversationMemberships.filter((membership) => membership.memberId !== currentUser._id)[0];
                const otherMembers = await ctx.db.get(otherMembership.memberId);
                return { conversation, otherMembers, lastMessage }
            }
        })

        )

        return conversationWithDetails;

    },
});


const getLastMessageDetails = async ({ ctx, id }: { ctx: QueryCtx | MutationCtx; id: Id<"messages"> | undefined }) => {

    if (!id) return null;

    const message = await ctx.db.get(id);

    if (!message) return null;

    const sender = await ctx.db.get(message.senderId)

    if (!sender) return null;

    const content = getMessageContent(message.type, message.content as unknown as string)

    return { content, sender: sender.username }
}

const getMessageContent = (type: string, content: string) => {
    switch (type) {
        case "text": return content;
        default: return "[Non-text]"
    }
}


//GroupLisitng and FriendListing
export const getGroupsAndFriends = query({
  args: {},
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

    const groupConversations = await ctx.db
      .query("conversations")
      .withIndex("by_group", (q) => q.eq("isGroup", true))
      .collect();

    const conversationMemberships = await ctx.db
      .query("conversationMembers")
      .withIndex("by_memberId", (q) => q.eq("memberId", currentUser._id))
      .collect();

    const allConversations = [
      ...groupConversations.map((conversation) => conversation._id), // extract _id from group conversations
      ...conversationMemberships.map((membership) => membership.conversationId), // extract conversationId from memberships
    ];

    const uniqueConversationIds = [...new Set(allConversations)];

    const conversations = await Promise.all(
      uniqueConversationIds.map(async (conversationId) => {
        const conversation = await ctx.db.get(conversationId);

        if (!conversation) {
          throw new ConvexError("Conversation could not be found");
        }

        const allConversationMemberships = await ctx.db
          .query("conversationMembers")
          .withIndex("by_conversationId", (q) => q.eq("conversationId", conversation._id))
          .collect();

        const lastMessage = await getLastMessageDetails({
          ctx,
          id: conversation.lastMessageId,
        });

        if (conversation.isGroup) {
          return { conversation, lastMessage, type: "group" };
        } else {
          const otherMembership = allConversationMemberships.find(
            (membership) => membership.memberId !== currentUser._id
          );

          if (!otherMembership) {
            throw new ConvexError("Other member not found in the conversation");
          }

          const otherMembers = await ctx.db.get(otherMembership.memberId);

          return { conversation, otherMembers, lastMessage, type: "friend" };
        }
      })
    );

    const groupConvs = conversations.filter((convo) => convo.type === "group");
    const friendConvs = conversations.filter((convo) => convo.type === "friend");

    return { groupConvs, friendConvs };
  },
});