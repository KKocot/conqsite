import z from "zod";
export const putSurveySchema = z.object({
  _id: z.string().min(1).optional(),
  discordNick: z.string(),
  discordId: z.string(),
  inGameNick: z.string(),
  characterLevel: z.string(),
  artyAmount: z.enum(["none", "some", "average", "aLot"]),
  weapons: z.array(
    z.object({
      value: z.boolean(),
      leadership: z.number(),
    })
  ),
  units: z.object({
    low: z.array(
      z.object({
        id: z.number(),
        value: z.string(),
      })
    ),
    heroic: z.array(
      z.object({
        id: z.number(),
        value: z.string(),
      })
    ),
    golden: z.array(
      z.object({
        id: z.number(),
        value: z.string(),
      })
    ),
  }),
});
