import z from "zod";

const weaponSchema = z.object({
  id: z.number(),
  name: z.string(),
  src: z.string(),
});
export default weaponSchema;
