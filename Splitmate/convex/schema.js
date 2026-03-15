import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
    imageUrl: v.optional(v.string()),
  })
    .index("by_tokenIdentifier", ["tokenIdentifier"]), // 👈 THIS IS REQUIRED



expenses : defineTable({
  description :v.string(),
    amount : v.number(),
    category : v.optional(v.string()),
    date:v.number(),
    paidByUserId: v.id("users"),//Actually refers to User table
    splitType:v.string(),//"equal","percentage","exact"
    splits:v.array(
      v.object({
        userId: v.id("users"),//Reference to users table
        amount: v.number(), //amount owed by this user
        paid: v.boolean(),

      })
    ),
    groupId:v.optional(v.id("groups")),// undefined for one-on-one expenses
    createdBy:v.id("users"),//Reference to users table
  })
  .index("by_group",["groupId"])
  .index("by_user_and_group",["paidByUserId", "groupId"])
  .index("by_date", ["date"]),


  groups:defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    createdBy: v.id("users"),// Reference to users table
    members: v.array(
      v.object({
        userId: v.id("users"), //Reference to users table
        role:v.string(), //"admin" or "member"
        joinedAt:v.number(),
      })
    ),
  }),

  settlements: defineTable({
    amount:v.number(),
    note:v.optional(v.string()),
    date: v.number(), //timestamp
    paidByUserId: v.id("users"), //Reference to users table
    recieveByUserId: v.id("users"),//Reference to users table
    groupId: v.optional(v.id("groups")),//undefined for one-to-one settlements
relatedExpensesIds:v.optional(v.array(v.id("expenses"))),//Which expenses this settlment covers
    createdBy: v.id("users"), //Reference to users table
  })
  .index("by_group",["groupId"])
  .index("by_user_and_group",["paidByUserId","groupId"])
  .index("by_reciever_and_group",["recieveByUserId","groupId"])
  .index("by_date",["date"]),
});