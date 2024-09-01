import mongoose, { Schema } from "mongoose";

const HouseSchema = new Schema({
  name: String,
  description: String,
  country: String,
  discordLink: String,
  avatar: String,
  server: String,
});

const House = mongoose.models.House || mongoose.model("House", HouseSchema);

export default House;
