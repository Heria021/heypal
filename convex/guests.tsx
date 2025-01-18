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

        const guestPosts = await ctx.db.query("guestPost").order('desc').collect();

        const posts = await Promise.all(guestPosts.map(async (guestPost) => {
            const post = await ctx.db.get(guestPost.postId);
            if (!post) {
                throw new ConvexError("Post not found")
            }
            const guest = await ctx.db.query('guestProfile').withIndex('by_userId', (q) => q.eq('userId', guestPost.userId)).first();

            if (!guest) {
                throw new ConvexError("Post not found")
            }
            return {
                post: post,
                guest: guest,
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

        const guestPost = await ctx.db.insert('guestPost', {
            userId: currentUser._id,
            postId: post
        })

        if (!guestPost) {
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

        const guestComments = await Promise.all(comments.map(async (comment) => {
            const guest = await ctx.db.query('guestProfile')
                .withIndex('by_userId', (q) => q.eq('userId', comment.userId))
                .first(); 
        
            if (!guest) {
                throw new ConvexError('Guest not found!');
            }
        
            return { 
                guest: {
                    bio: guest.bio,
                    imageUrl: guest.imageUrl,
                    userId: guest.userId,
                    userName: guest.userName
                },
                comment: comment.comment 
            };
        }));

        return guestComments

    },
});
