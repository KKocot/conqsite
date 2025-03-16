import mongoose, { Schema } from "mongoose";

const otherActivitiesSchema: Schema = new Schema({
  date: String,
  type: String,
});

const userStatsSchema: Schema = new Schema({
  id: String,
  nick: String,
  house: [String],
  attendance: [String],
  otherActivities: { type: [otherActivitiesSchema], required: false },
});

const UserStats =
  mongoose.models.UserStats || mongoose.model("UserStats", userStatsSchema);

export default UserStats;
