import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

// User
export const get = query({
  args: {},
  async handler(ctx, args) {
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

    const user = await ctx.db.get(currentUser._id);

    if (!user) {
      throw new ConvexError("User not found");
    }
    const userProfile = await ctx.db.query('userProfile').withIndex('by_userId', (q) => q.eq('userId', currentUser._id)).unique();
    if (!userProfile) {
      throw new ConvexError("User profile not found.")
    }
    const userDetails = { ...user, ...userProfile };
    console.log(userDetails)

    return userDetails;
  },
});

export const getUserById = mutation({
  args: {
    userId: v.id("users"),
  },
  async handler(ctx, args) {
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

    const user = await ctx.db.get(args.userId);

    if (!user) {
      throw new ConvexError("User not found");
    }
    const userProfile = await ctx.db.query('userProfile').withIndex('by_userId', (q) => q.eq('userId', args.userId)).unique();
    if (!userProfile) {
      throw new ConvexError("User profile not found.")
    }
    const userDetails = { ...user, ...userProfile };
    console.log(userDetails)

    return userDetails;
  },
});


export const updateMoodStatus = mutation({
  args: {
    userProfileId: v.id("userProfile"),
    content: v.string(),
  },
  async handler(ctx, args) {
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
    await ctx.db.patch(args.userProfileId, {mood_status: args.content,});

    return { success: true };
  },
});


//Group
export const getGroupById = query({
  args: {
    conversationsId: v.id("conversations"),
  },
  async handler(ctx, args) {
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

    const conversation = await ctx.db.get(args.conversationsId);
    if (!conversation || !conversation.isGroup) {
      return null;
    }

    const groupInfo = await ctx.db
      .query("groupDetails")
      .withIndex("by_conversationId", (q) => q.eq("conversationsId", args.conversationsId))
      .unique();

    if (!groupInfo) {
      throw new ConvexError("Group details not found.");
    }

    const group = await ctx.db.get(conversation._id);
    const admins = await Promise.all(
      groupInfo.admins.map(async (adminId) => await ctx.db.get(adminId))
    );

    const groupDetails = { groupInfo, admins, group };
    return groupDetails;
  },
});