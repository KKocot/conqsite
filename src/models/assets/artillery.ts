import mongoose, { Schema } from "mongoose";

const ArtillerySchema = new Schema({
  name: String,
  src: String,
  id: Number,
  rarity: String,
});

const Artillery =
  mongoose.models.Artillery || mongoose.model("Artillery", ArtillerySchema);

export default Artillery;
