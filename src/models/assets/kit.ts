import mongoose from "mongoose";

const KitSchema = new mongoose.Schema({
  image: { type: String, required: true },
  unit: { type: String, required: true },
});

export const Kit = mongoose.models.Kit || mongoose.model("Kit", KitSchema);
