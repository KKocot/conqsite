import mongoose, { Schema } from "mongoose";

const UnitPostSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true },
  house: { type: String, required: true },
  unit: { type: String },
  ytlink: { type: String },
  description: { type: String },
  doctrines: [{ id: Number, name: String, img: String, stats: String }],
  tree: {
    structure: { type: Map, of: Number },
    maxlvl: { type: Number },
  },
});

const UnitPost =
  mongoose.models.UnitPost || mongoose.model("UnitPost", UnitPostSchema);

export default UnitPost;
