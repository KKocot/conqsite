import mongoose, { Schema } from "mongoose";

const TemplateSchema = new Schema({
  templateName: { type: String, required: true },
  house: { type: String, required: true },
  sheet: [
    {
      artillery: [
        {
          id: { type: Number, required: true },
          check: { type: Boolean, required: true },
        },
      ],
      color: { type: String, required: true },
      description: { type: String, required: true },
      unit1: { type: String, required: true },
      unit2: { type: String, required: true },
      unit3: { type: String, required: true },
      username: { type: String, required: true },
      weapon: { type: String, required: true },
    },
  ],
});

const Template =
  mongoose.models.Template || mongoose.model("Template", TemplateSchema);

export default Template;
