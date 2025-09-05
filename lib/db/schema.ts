//lib/db/schema.ts
//lib/db/schema.ts
import { integer, pgTable, varchar, text, timestamp, real } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
 id: integer().primaryKey().generatedAlwaysAsIdentity(),
 clerkId: varchar({ length: 255 }).notNull().unique(),
 email: varchar({ length: 255 }).notNull().unique(),
 firstName: varchar({ length: 255 }),
 lastName: varchar({ length: 255 }),
 subscriptionStatus: varchar({ length: 50 }).default('free'),
 createdAt: timestamp().defaultNow().notNull(),
 updatedAt: timestamp().defaultNow().notNull(),
});

export const papersTable = pgTable("papers", {
 id: integer().primaryKey().generatedAlwaysAsIdentity(),
 title: varchar({ length: 500 }).notNull(),
 summary: text().notNull(),
 audioUrl: varchar({ length: 500 }),
 category: varchar({ length: 100 }).notNull(), // ai, quantum
 publishedAt: timestamp().notNull(),
 createdAt: timestamp().defaultNow().notNull(),
});

export const userInteractionsTable = pgTable("user_interactions", {
 id: integer().primaryKey().generatedAlwaysAsIdentity(),
 userId: integer().references(() => usersTable.id),
 paperId: integer().references(() => papersTable.id),
 action: varchar({ length: 50 }).notNull(), // view, like, share, listen
 timeSpent: integer(), // seconds
 createdAt: timestamp().defaultNow().notNull(),
});

export const userPreferencesTable = pgTable("user_preferences", {
 id: integer().primaryKey().generatedAlwaysAsIdentity(),
 userId: integer().references(() => usersTable.id),
 category: varchar({ length: 100 }).notNull(),
 weight: real().default(1.0), // preference strength
 updatedAt: timestamp().defaultNow().notNull(),
});

export const recommendationsTable = pgTable("recommendations", {
 id: integer().primaryKey().generatedAlwaysAsIdentity(),
 userId: integer().references(() => usersTable.id),
 paperId: integer().references(() => papersTable.id),
 score: real().notNull(), // ML confidence score
 createdAt: timestamp().defaultNow().notNull(),
});
