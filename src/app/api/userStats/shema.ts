import { z } from "zod";

const putUserStatsSchema = z.object({
  id: z.string(),
  house: z.string(),
  attendance: z.array(z.string()),
});

export default putUserStatsSchema;
