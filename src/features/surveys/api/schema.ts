import { z } from "zod";

const unitSchema = z.object({
  id: z.number(),
  value: z.string(),
});
export const surveySchema = z.object({
  artyAmount: z.enum(["none", "some", "average", "aLot"]),
  avatar: z.string().optional(),
  characterLevel: z.string(),
  discordId: z.string(),
  discordNick: z.string(),
  house: z
    .union([z.array(z.string()), z.string()])
    .transform((a) => (Array.isArray(a) ? a : [a])),
  inGameNick: z.string(),
  role: z.string().optional(),
  weapons: z
    .object({
      value: z.boolean(),
      leadership: z.number(),
      pref: z.number().optional(),
    })
    .array(),
  units: z.object({
    low: unitSchema.array(),
    heroic: unitSchema.array(),
    golden: unitSchema.array(),
  }),
});
export type Survey = z.infer<typeof surveySchema>;
