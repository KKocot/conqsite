import mongoose, { Schema } from "mongoose";

const RolestSchema = new Schema({
  discordNick: String,
  discordId: String,
  role: String,
  house: String,
  muted: Boolean,
});

const Roles = mongoose.models.Roles || mongoose.model("Roles", RolestSchema);

export default Roles;
