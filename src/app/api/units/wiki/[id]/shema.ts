import { z } from "zod";

const statusSchema = z.object({
  id: z.string(),
  status: z.string(),
  reviewNotes: z.string(),
});

export default statusSchema;
