import mongoose from "mongoose";

const DoctrineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  forUnit: { type: [String], required: true },
  dedicated: {
    type: String,
    enum: ["all", "group", "unit"],
    required: true,
  },
  stats: { type: String, required: true },
  rarity: {
    type: String,
    enum: ["common", "uncommon", "rare", "epic"],
    required: true,
  },
});

export const Doctrine =
  mongoose.models.Doctrine || mongoose.model("Doctrine", DoctrineSchema);
