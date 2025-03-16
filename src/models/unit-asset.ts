import mongoose, { Schema } from "mongoose";

const UnitAssetSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  leadership: { type: Number, required: false },
  value: { type: Number, required: false },
  era: { type: String, required: true },
  icon: { type: String, required: true },
  src: { type: String, required: true },
});

const UnitAsset =
  mongoose.models.UnitAsset || mongoose.model("UnitAsset", UnitAssetSchema);

export default UnitAsset;
