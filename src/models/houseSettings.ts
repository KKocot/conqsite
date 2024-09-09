import mongoose, { Schema } from "mongoose";

// Create Mongoose schemas
const HouseSchema: Schema = new Schema({
  name: String,
  id: String,
});

const MemberSchema: Schema = new Schema({
  name: String,
  id: String,
});

const LineupSchema: Schema = new Schema({
  name: String,
  id: String,
  roleId: String,
});

const LogsSchema: Schema = new Schema({
  logs: String,
  attendance: String,
});

const TWSchema: Schema = new Schema({
  server: String,
  member: String,
});

const HouseSettingsShema: Schema = new Schema({
  id: String,
  house: HouseSchema,
  member: MemberSchema,
  lineup: [LineupSchema],
  logs: LogsSchema,
  tw: TWSchema,
});

const HouseSettings =
  mongoose.models.HouseSettings ||
  mongoose.model("HouseSettings", HouseSettingsShema);
export default HouseSettings;
