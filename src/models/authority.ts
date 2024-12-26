import mongoose, { Schema } from "mongoose";

const AuthoritySchema = new Schema({
  name: String,
  id: String,
  image: String,
  token: String,
  tokenExpiration: String,
});

const Authority =
  mongoose.models.Authority || mongoose.model("Authority", AuthoritySchema);

export default Authority;
