import mongoose, { Schema, Document } from "mongoose";

interface House {
  name: string;
  id: string;
}

interface Member {
  name: string;
  id: string;
}

interface Lineup {
  name: string;
  id: string;
  roleId: string;
}

interface Logs {
  logs: string;
  attendance: string;
}

interface TW {
  server: string;
  member: string;
}

interface Data extends Document {
  house: House;
  member: Member;
  lineup: Lineup[];
  logs: Logs;
  tw: TW;
}

// Create Mongoose schemas
const HouseSchema: Schema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
});

const MemberSchema: Schema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
});

const LineupSchema: Schema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  roleId: { type: String, required: true },
});

const LogsSchema: Schema = new Schema({
  logs: { type: String, required: true },
  attendance: { type: String, required: true },
});

const TWSchema: Schema = new Schema({
  server: { type: String, required: true },
  member: { type: String, required: true },
});

const DataSchema: Schema = new Schema({
  house: { type: HouseSchema, required: true },
  member: { type: MemberSchema, required: true },
  lineup: { type: [LineupSchema], required: true },
  logs: { type: LogsSchema, required: true },
  tw: { type: TWSchema, required: true },
});

const HouseSettings = mongoose.model<Data>("Data", DataSchema);
export default HouseSettings;
