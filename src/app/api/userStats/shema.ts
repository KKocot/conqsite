import { z } from "zod";

const putUserStatsSchema = z.object({
  nick: z.string(),
  id: z.string(),
  house: z.array(z.string()),
  attendance: z.array(z.string()),
  otherActivities: z
    .array(
      z
        .object({
          date: z.string(),
          type: z.string(),
        })
        .optional()
    )
    .optional(),
});

export default putUserStatsSchema;
