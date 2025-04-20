import z from "zod";

const doctrineSchema = z.object({
  name: z.string(),
  img: z.string(),
  forUnit: z.array(z.string()),
  dedicated: z.enum(["all", "group", "unit"]),
  stats: z.string(),
  rarity: z.enum(["common", "uncommon", "rare", "epic"]),
});
export default doctrineSchema;
