import z from "zod";

const mapPublicSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  map: z.string(),
  elements: z.array(z.any()).optional(),
});

export const planPublicSchema = z.object({
  publicName: z.string(),
  house: z.string(),
  layers: mapPublicSchema.array(),
});
