//lib/db/schema.ts
//lib/db/schema.ts
import { integer, pgTable, varchar, text, timestamp, real, boolean } from "drizzle-orm/pg-core";

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
  arxivId: varchar({ length: 255 }).notNull().unique(),
  title: varchar({ length: 1000 }).notNull(),
  summary: text().notNull(),
  authors: text().notNull(), // JSON string of authors array
  categories: text().notNull(), // JSON string of categories array
  publishedDate: timestamp().notNull(),
  pdfUrl: varchar({ length: 500 }),
  arxivUrl: varchar({ length: 500 }),
  generatedSummary: text(), // AI-generated plain English summary
  audioUrl: varchar({ length: 500 }),
  processed: boolean().default(false),
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
