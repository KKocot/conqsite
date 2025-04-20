import mongoose from "mongoose";

const WeaponSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  src: { type: String, required: true },
});

export const Weapon =
  mongoose.models.Weapon || mongoose.model("Weapon", WeaponSchema);
