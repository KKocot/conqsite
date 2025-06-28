import mongoose from "mongoose";

const OtherIconsSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export const OtherTacticalIcons =
  mongoose.models.OtherTacticalIcons ||
  mongoose.model("OtherTacticalIcons", OtherIconsSchema);
