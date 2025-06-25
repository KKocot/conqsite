import mongoose, { Schema } from "mongoose";

const PlanPublicSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  map: { type: String, required: true },
  elements: [
    {
      type: Schema.Types.Mixed,
      required: true,
    },
  ],
});

const PlanPublicArraySchema = new Schema({
  publicName: { type: String, required: true },
  house: { type: String, required: true },
  layers: [PlanPublicSchema],
});

const PlanPublic =
  mongoose.models.PlanPublic ||
  mongoose.model("PlanPublic", PlanPublicArraySchema);

export default PlanPublic;
