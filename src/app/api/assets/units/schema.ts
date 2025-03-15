import z from "zod";

const unitAssetSchema = z.object({
  id: z.number(),
  name: z.string(),
  leadership: z.number().optional(),
  value: z.number().optional(),
  era: z.string(),
  icon: z.string(),
  src: z.string(),
});
export default unitAssetSchema;
