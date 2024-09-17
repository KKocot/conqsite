import mongoose, { Schema } from "mongoose";

const userStatsSchema: Schema = new Schema({
  id: String,
  house: String,
  attendance: [String],
});

const UserStats =
  mongoose.models.UserStats || mongoose.model("UserStats", userStatsSchema);

export default UserStats;
