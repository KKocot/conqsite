import z from "zod";

const ArtillerySchema = z.object({
  id: z.number().int(),
  check: z.boolean(),
});

const SheetSchema = z.object({
  artillery: z.array(ArtillerySchema),
  color: z.string(),
  description: z.string(),
  unit1: z.string(),
  unit2: z.string(),
  unit3: z.string(),
  username: z.string(),
  weapon: z.string(),
});

export const putPublicLineupSchema = z.object({
  name: z.string(),
  house: z.string(),
  date: z.string(),
  sheet: z.array(SheetSchema),
});
