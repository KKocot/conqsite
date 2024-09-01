import { z } from "zod";

export const putHouseSchema = z.object({
  name: z.string(),
  description: z.string(),
  country: z.string(),
  discordLink: z.string(),
  avatar: z.string(),
  server: z.string(),
});
