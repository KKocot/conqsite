import z from "zod";

const mapTemplateSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  map: z.string(),
  elements: z.array(z.any()).optional(),
});

export const planTemplateSchema = z.object({
  templateName: z.string(),
  house: z.string(),
  layers: mapTemplateSchema.array(),
});
