import mongoose, { Schema } from "mongoose";

const TWHistorySchema = new Schema({
  twDate: Date,
  ytUrl: String,
  title: String,
  description: String,
  visibleTo: String,
  author: String,
  house: String,
  publicDate: Date,
  authorID: String,
});

const TWHistory =
  mongoose.models.TWHistory || mongoose.model("TWHistory", TWHistorySchema);

export default TWHistory;
