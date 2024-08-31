import z from "zod";

const lineupSchema = z.object({
  name: z.string(),
  signup: z.array(z.string()),
});

export const attendanceSchema = z.object({
  date: z.string(),
  house: z.string(),
  lineup: z.array(lineupSchema),
});
