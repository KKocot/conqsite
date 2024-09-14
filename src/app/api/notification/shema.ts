import z from "zod";

export const notificationSchema = z.object({
  date: z.string(),
  house: z.string(),
  type: z.string(),
  description: z.string(),
  from: z.string(),
  to: z.string(),
  readed: z.boolean(),
  id: z.string(),
});
