import { weapons } from "@/assets/weapons";
import {
  integer,
  json,
  pgEnum,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
export const amountEnum = pgEnum("amount", ["none", "some", "average", "many"]);

export const surveys = pgTable("survey", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  inGameNick: text("in_game_nick").notNull(),
  characterLevel: integer("character_level").notNull(),
  artyleryAmount: amountEnum("artylery_amount").notNull(),
  weapons: json("weapons")
    .$type<{ id: number; value: number }[]>()
    .notNull()
    .default([]),
  units: json("units_low")
    .$type<{
      low: { id: number; value: string }[];
      heroic: { id: number; value: string }[];
      golden: { id: number; value: string }[];
    }>()
    .notNull(),
});

const unitSchema = z.object({ id: z.number(), value: z.string() });
export const insertSurveySchema = createInsertSchema(surveys).merge(
  z.object({
    weapons: z.object({ id: z.number(), value: z.coerce.number() }).array(),
    units: z.object({
      low: unitSchema.array(),
      heroic: unitSchema.array(),
      golden: unitSchema.array(),
    }),
  })
);

export type Survey = z.infer<typeof insertSurveySchema>;
