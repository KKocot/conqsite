import { z } from "zod";

const HouseSchema = z.object({
  name: z.string(),
  id: z.string(),
});

const MemberSchema = z.object({
  name: z.string(),
  id: z.string(),
});

const LineupSchema = z.object({
  name: z.string(),
  id: z.string(),
  roleId: z.string(),
});

const LogsSchema = z.object({
  logs: z.string(),
  attendance: z.string(),
});

const TwSchema = z.object({
  server: z.string(),
  member: z.string(),
});

const putHouseSettingsSchema = z.object({
  house: HouseSchema,
  member: MemberSchema,
  lineup: z.array(LineupSchema),
  logs: LogsSchema,
  tw: TwSchema,
  id: z.string(),
});

export default putHouseSettingsSchema;
