import { z } from "zod";

export const EventControllerSchema = z.object({
  event_template_id: z.string(),
  date: z.string(),
  time: z.string(),
  interval: z.union([z.literal("TW"), z.literal("Never"), z.number()]),
  activity_time: z.number(),
  title: z.string(),
  description: z.string(),
  guild_id: z.string(),
  house_name: z.string(),
  channel_id: z.string(),
  role_id: z.string(),
});
