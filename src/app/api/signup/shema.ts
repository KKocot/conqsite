import z from "zod";

export const putSignUpSchema = z.object({
  date: z.string(),
  1: z.array(z.string()),
  2: z.array(z.string()),
  3: z.array(z.string()),
  4: z.array(z.string()),
});
