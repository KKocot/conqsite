import { z } from "zod";

const putUnitObjectSchema = z.object({
  name: z.string(),
  icon: z.string(),
  authors: z.array(z.string()),
  era: z.string(),
  image: z.string(),
  leadership: z.string(),
  value: z.array(z.number()),
  masteryPoints: z.boolean(),
  maxlvl: z.string(),
  accepted: z.boolean(),
  season: z.object({
    number: z.string().optional(),
    name: z.string().optional(),
  }),
  description: z.string().optional(),
  skills: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      image: z.string(),
    })
  ),
  challenges: z.array(
    z.object({
      tier: z.number(),
      quests: z.array(z.string()),
    })
  ),
  formations: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      image: z.string(),
    })
  ),
  treeStructure: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      img: z.string(),
      prev: z.number().nullable(),
      id: z.number(),
      value: z.number(),
    })
  ),
});

export default putUnitObjectSchema;
