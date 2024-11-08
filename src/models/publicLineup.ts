import mongoose, { Schema } from "mongoose";

const PublicLineupSchema = new Schema({
  name: { type: String, required: true },
  house: { type: String, required: true },
  date: { type: String, required: true },
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
});

const PublicLineup =
  mongoose.models.PublicLineup ||
  mongoose.model("PublicLineup", PublicLineupSchema);

export default PublicLineup;
