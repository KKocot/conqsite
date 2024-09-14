import mongoose, { Schema } from "mongoose";

const NotificationSchema = new Schema({
  date: String,
  house: String,
  type: String,
  description: String,
  from: String,
  to: String,
  readed: Boolean,
  id: String,
});

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);

export default Notification;
