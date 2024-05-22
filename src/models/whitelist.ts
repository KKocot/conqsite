import mongoose, { Schema } from "mongoose";

const WhitelistSchema = new Schema({
  usernameDiscord: String,
  idDiscord: String,
});

const Whitelist =
  mongoose.models.Whitelist || mongoose.model("Whitelist", WhitelistSchema);

export default Whitelist;
