import mongoose, { Schema } from "mongoose";

const signUpsSchema = new Schema({
  name: String,
  status: String,
  lineup: String,
  userId: String,
});
const EventSchema = new Schema({
  eventId: String,
  date: String,
  house: String,
  signUps: [signUpsSchema],
});

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default Event;
