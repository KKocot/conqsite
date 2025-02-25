import mongoose, { Schema } from "mongoose";

const signUpsSchema = new Schema({
  name: String,
  status: String,
  lineup: String,
  userId: String,
});
const EventSchema = new Schema({
  bot_type: String,
  date_start_event: String,
  time_start_event: String,
  interval: Number,
  activity_time: Number,
  title: String,
  description: String,
  house_name: String,
  channel_id: String,
  role_id: String,
  signUps: [signUpsSchema],
});

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default Event;
