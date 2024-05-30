import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const whitelist = pgTable("whitelist", {
  discord_id: text("id").notNull().primaryKey(),
});

// Schema for category - used to validate API requests
export const insertWhitelistSchema = createInsertSchema(whitelist);

// Types for category - used to type API request params and within Components
export type WhitelistItem = z.infer<typeof insertWhitelistSchema>;
