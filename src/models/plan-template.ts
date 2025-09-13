import mongoose, { Schema } from "mongoose";

const PlanTemplateSchema = new Schema({
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

const PlanTemplateArraySchema = new Schema({
  templateName: { type: String, required: true },
  house: { type: String, required: true },
  layers: [PlanTemplateSchema],
  muted: { type: Boolean, default: false },
});

const PlanTemplate =
  mongoose.models.PlanTemplate ||
  mongoose.model("PlanTemplate", PlanTemplateArraySchema);

export default PlanTemplate;
