import z from "zod";

export const putSignUpSchema = z.object({
  date: z.string(),
  lineup_1: z.array(z.string()),
  lineup_2: z.array(z.string()),
  lineup_3: z.array(z.string()),
  lineup_4: z.array(z.string()),
  lineup_5: z.array(z.string()),
});
