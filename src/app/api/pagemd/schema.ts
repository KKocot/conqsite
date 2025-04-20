import { z } from "zod";

export const pageMDSchema = z.object({
  page: z.string(),
  body: z.string(),
});
