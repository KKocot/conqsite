import mongoose, { Schema } from "mongoose";

const UnitPostSchema = new Schema({
  title: { type: String, required: true },
  id: { type: String },
  unit: { type: String },
  ytlink: { type: String },
  description: { type: String },
  doctrines: [{ id: Number, name: String, img: String }],
  tree: {
    structure: { type: Map, of: Number },
    maxlvl: { type: Number },
  },
});

const UnitPost =
  mongoose.models.UnitPost || mongoose.model("UnitPost", UnitPostSchema);

export default UnitPost;
