import { z } from "zod";

export const twHistorySchema = z.object({
  twDate: z.string().transform((str) => new Date(str)),
  ytUrl: z.string().url(),
  title: z.string(),
  description: z.string(),
  visibleTo: z.string(),
  house: z.string(),
  author: z.string(),
  publicDate: z.string().transform((str) => new Date(str)),
  authorID: z.string(),
});
