import z from "zod";

export const putSignUpSchema = z.object({
  date: z.string(),
  lineup_one: z.array(z.string()),
  lineup_two: z.array(z.string()),
  lineup_three: z.array(z.string()),
  lineup_four: z.array(z.string()),
});
