import z from "zod";

const houseAssetsSchema = z.object({
  name: z.string(),
  premium: z.boolean(),
  sharedList: z.boolean(),
  signupBot: z.enum(["raidhelper", "apollo", "konquerus"]),
});

export default houseAssetsSchema;
