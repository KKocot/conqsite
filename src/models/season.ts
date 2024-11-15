import mongoose, { Schema } from "mongoose";

const SeasonSchema = new Schema({
  numberOfSeason: Number,
  start: Date,
  end: Date,
  drill: [String],
});

const Season = mongoose.models.Season || mongoose.model("Season", SeasonSchema);

export default Season;
