import mongoose, { Schema } from "mongoose";

const UsersSchema = new Schema({
  usernameDiscord: String,
  idDiscord: String,
  role: {
    type: String,
    enum: ["member", "recruter", "commander", "admin", "headadmin"],
    required: true,
    default: "member",
  },
  points: Number,
});

const Users = mongoose.models.Users || mongoose.model("users", UsersSchema);

export default Users;
