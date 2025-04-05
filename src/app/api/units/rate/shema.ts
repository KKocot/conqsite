import { z } from "zod";

const putRateSchema = z.object({
  unit: z.string(),
  rate: z.number(),
});

export default putRateSchema;
