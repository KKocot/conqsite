import z from "zod";

const artillerySchema = z.object({
  name: z.string(),
  src: z.string(),
  id: z.number(),
});
export default artillerySchema;
