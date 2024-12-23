import mongoose, { Schema } from "mongoose";

const SeasonsSchema = new Schema({
  season: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  drillModes: [{ type: String }],
});

const Seasons =
  mongoose.models.Seasons || mongoose.model("Seasons", SeasonsSchema);

export default Seasons;
