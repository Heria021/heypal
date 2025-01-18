import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

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
        };

        const userPosts = await ctx.db.query("userPosts").order('desc').collect();

        const posts = await Promise.all(userPosts.map(async (userPost) => {
            const post = await ctx.db.get(userPost.postId);
            if (!post) {
                throw new ConvexError("Post not found")
            }
            const user = await ctx.db.get(userPost.userId);
            if (!user) {
                throw new ConvexError("Post not found")
            }
            return {
                post: post,
                user: user,
            };
        }));

        return posts;

    },
});


export const createPost = mutation({
    args: {
        title: v.string(),
        content: v.string(),
        category: v.string(),
        tags: v.array(v.string())
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

        const post = await ctx.db.insert('post', {
            ...args,
            likes: 0,
            theme: ''
        });

        if (!post) {
            throw new ConvexError('failed to create post')
        }

        const userPost = await ctx.db.insert('userPosts', {
            userId: currentUser._id,
            postId: post
        })

        if (!userPost) {
            await ctx.db.delete(post);
            throw new ConvexError('failed to create post')
        }

        return true;
    },
});



export const comments = query({
    args: {
        postId: v.id('post')
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

        const comments = await ctx.db.query("comment").withIndex('by_postId', (q) => q.eq('postId', args.postId)).order('desc').collect();
        if (!comments) {
            throw new ConvexError('Comments not found!');
        }
        return comments;
    },
});


export const createComment = mutation({
    args: {
        postId: v.id('post'),
        comment: v.string(),
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

        const newComment = await ctx.db.insert('comment', {
            userId: currentUser._id,
            ...args
        });
    },
});

