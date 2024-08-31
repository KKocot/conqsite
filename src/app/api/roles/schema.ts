import { z } from "zod";

export const putRolestSchema = z.object({
  discordNick: z.string(),
  discordId: z.string(),
  role: z.string(),
  house: z.string(),
});
