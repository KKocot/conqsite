import { z } from "zod";

const LineupSchema = z.object({
  roleID: z.string(),
  channelID: z.string(),
  name: z.string(),
});

const MemberSchema = z.object({
  username: z.string(),
  id: z.string(),
});
const putCreateHouseSchema = z.object({
  guild_id: z.string(),
  tw_discord: z.string(),
  member: z.string(),
  logs: z.string(),
  tw_member: z.string(),
  lineup: z.array(LineupSchema),
  name: z.string(),
  description: z.string(),
  country: z.string(),
  discordLink: z.string(),
  avatar: z.string(),
  server: z.string(),
  highcommand: z.array(MemberSchema).optional().default([]),
  righthand: z.array(MemberSchema).optional().default([]),
});

export default putCreateHouseSchema;
