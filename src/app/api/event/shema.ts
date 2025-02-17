import { z } from "zod";

const signUpSchema = z.object({
  name: z.string(),
  status: z.string(),
  lineup: z.string(),
  userId: z.string(),
});

export const putEventSchema = z.object({
  _id: z.string().optional(),
  bot_type: z.string(),
  date_start_event: z.string(),
  time_start_event: z.string(),
  interval: z.number(),
  activity_time: z.number(),
  title: z.string(),
  description: z.string(),
  house_name: z.string(),
  channel_id: z.string(),
  role_id: z.string(),
  signUps: z.array(signUpSchema),
});
