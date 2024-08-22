import mongoose, { Schema } from "mongoose";

const WhitelistSchema = new Schema({
  idDiscord: String,
  house: String,
});

const Whitelist =
  mongoose.models.Whitelist || mongoose.model("Whitelist", WhitelistSchema);

export default Whitelist;
