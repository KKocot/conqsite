import z from "zod";

/**
 * House Assets Model
 * @property {string} name - House name
 * @property {boolean} premium - Enable extended features
 * @property {boolean} sharedList - Allow sharing member list with all house members
 * @property {'konquerus' | 'apollo' | 'raidhelper'} signupBot - Bot used for signup
 * @property {boolean} messages - Allow bot to send messages to members
 */

const houseAssetsSchema = z.object({
  name: z.string(),
  premium: z.boolean(),
  sharedList: z.boolean(),
  signupBot: z.string(),
  messages: z.boolean().optional(),
});

export default houseAssetsSchema;
