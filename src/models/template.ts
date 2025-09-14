import mongoose, { Schema } from "mongoose";

const TemplateSchema = new Schema({
  templateName: { type: String, required: true },
  commander: { type: String, required: false },
  house: { type: String, required: true },
  sheet: [
    {
      artillery: [
        {
          id: { type: Number, required: true },
          check: { type: Boolean, required: true },
        },
      ],
      color: { type: String, required: false },
      description: { type: String, required: false },
      unit1: { type: String, required: false },
      unit2: { type: String, required: false },
      unit3: { type: String, required: false },
      username: { type: String, required: false },
      weapon: { type: String, required: false },
    },
  ],
  muted: Boolean,
});

const Template =
  mongoose.models.Template || mongoose.model("Template", TemplateSchema);

export default Template;
