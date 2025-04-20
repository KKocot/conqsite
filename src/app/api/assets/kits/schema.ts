import z from "zod";

const kitSchema = z.object({
  image: z.string(),
  unit: z.string(),
});
export default kitSchema;
