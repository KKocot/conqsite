import { z } from "zod";

const veterancySchema = z.object({
  name: z.string(),
  treeStructure: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      img: z.string().optional(),
      prev: z.number().nullable(),
      id: z.number(),
      value: z.number(),
    })
  ),
});

export default veterancySchema;
