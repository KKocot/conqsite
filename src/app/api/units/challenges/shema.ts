import { z } from "zod";

const challengesSchema = z.object({
  name: z.string(),
  challenges: z.array(
    z.object({
      tier: z.number(),
      quests: z.array(z.string()),
    })
  ),
});

export default challengesSchema;
