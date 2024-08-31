import z from "zod";

export const putWhitelistSchema = z.object({
  idDiscord: z.string(),
  house: z.string(),
});
