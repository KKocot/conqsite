import { z } from "zod";

const putUnitPostSchema = z.object({
  title: z.string(),
  unit: z.string(),
  author: z.string(),
  house: z.string(),
  date: z.string(),
  ytlink: z.string().optional(),
  description: z.string().optional(),
  doctrines: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        img: z.string(),
        stats: z.string(),
      })
    )
    .optional(),
  tree: z
    .object({
      structure: z.record(z.number()),
      maxlvl: z.number().optional(),
    })
    .optional(),
});

export default putUnitPostSchema;
