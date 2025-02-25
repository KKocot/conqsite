import mongoose, { Schema } from "mongoose";

const HouseAssetsSchema = new Schema({
  name: String,
  premium: Boolean,
  sharedList: Boolean,
  signupBot: String,
});

const HouseAssets =
  mongoose.models.HouseAssets ||
  mongoose.model("HouseAssets", HouseAssetsSchema);

export default HouseAssets;
