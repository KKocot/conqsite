import { z } from "zod";

const signUpSchema = z.object({
  name: z.string(),
  status: z.string(),
  lineup: z.string(),
  userId: z.string(),
});

export const putEventSchema = z.object({
  eventId: z.string(),
  house: z.string(),
  date: z.string(),
  signUps: z.array(signUpSchema),
});
