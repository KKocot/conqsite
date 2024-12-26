import { z } from "zod";

const authoritySchema = z.object({
  name: z.string(),
  id: z.string(),
  image: z.string(),
  token: z.string(),
  tokenExpiration: z.string(),
});

export default authoritySchema;
