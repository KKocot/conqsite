import mongoose, { Schema } from "mongoose";

const PageMDSchema = new Schema({
  page: { type: String, required: true },
  body: { type: String, required: true },
});

const PageMD = mongoose.models.PageMD || mongoose.model("PageMD", PageMDSchema);

export default PageMD;
