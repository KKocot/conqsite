import { z } from "zod";

export const changeLeaderSchema = z.object({
  exLeaderName: z.string(),
  exLeaderId: z.string(),
  exLeaderNewRole: z.string(),
  newLeaderName: z.string(),
  newLeaderId: z.string(),
  house: z.string(),
});
