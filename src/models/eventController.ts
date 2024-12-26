import mongoose, { Schema } from "mongoose";

const EventControllerSchema = new Schema({
  event_template_id: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  interval: { type: Schema.Types.Mixed, required: true },
  activity_time: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  guild_id: { type: String, required: true },
  house_name: { type: String, required: true },
  channel_id: { type: String, required: true },
  role_id: { type: String, required: true },
});

const EventController =
  mongoose.models.EventController ||
  mongoose.model("EventController", EventControllerSchema);

export default EventController;
