import mongoose from "mongoose";

const MapSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cities: { type: [String], required: true },
  types: { type: [String], required: true },
  type: { type: String, required: true },
});

export const Map = mongoose.models.Map || mongoose.model("Map", MapSchema);
