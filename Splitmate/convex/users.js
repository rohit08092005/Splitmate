import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const store = mutation({
  args: {}, // 👈 correct to keep empty since we use auth identity only

  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication");
    }

    // 🔍 Find user by tokenIdentifier
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    // 🔁 Update if exists
    if (user) {
      await ctx.db.patch(user._id, {
        name: identity.name ?? "Anonymous",
        email: identity.email ?? user.email,
        imageUrl: identity.pictureUrl,
      });
      return user._id;
    }

    // ➕ Insert new user
    return await ctx.db.insert("users", {
      name: identity.name ?? "Anonymous",
      email: identity.email ?? "",
      tokenIdentifier: identity.tokenIdentifier,
      imageUrl: identity.pictureUrl,
    });
  },
});
