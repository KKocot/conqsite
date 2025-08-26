import mongoose, { Schema } from "mongoose";

/**
 * House Assets Model
 * @property {string} name - House name
 * @property {boolean} premium - Enable extended features
 * @property {boolean} sharedList - Allow sharing member list with all house members
 * @property {'konquerus' | 'apollo' | 'raidhelper'} signupBot - Bot used for signup
 * @property {boolean} messages - Allow bot to send messages to members
 */

const HouseAssetsSchema = new Schema({
  name: String,
  premium: Boolean,
  sharedList: Boolean,
  signupBot: String,
  messages: Boolean,
  premiumPlan: String,
  premiumEndTime: String,
});

const HouseAssets =
  mongoose.models.HouseAssets ||
  mongoose.model("HouseAssets", HouseAssetsSchema);

export default HouseAssets;
