import { z } from "zod";

export const putSeasonSchema = z.object({
  numberOfSeason: z.number(),
  start: z.string(),
  end: z.string(),
  drill: z.array(z.string()),
});
