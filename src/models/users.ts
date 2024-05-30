import mongoose, { Schema } from "mongoose";
// import { getModelForClass, prop } from "@typegoose/typegoose";

// enum Role {
//   MEMBER = "member",
//   RECRUTER = "recruter",
//   COMMANDER = "commander",
//   ADMIN = "admin",
//   HEADADMIN = "headadmin",
// }

// class UsersSchema {
//   @prop({ required: true })
//   public usernameDiscord?: string;
//   @prop({ required: true })
//   public idDiscord?: string;
//   @prop({ enum: () => Role, required: true })
//   public role?: Role;
//   @prop({ required: true })
//   public points?: number;
// }
// const UsersModel = getModelForClass(UsersSchema);

const UsersSchema = new Schema({
  usernameDiscord: String,
  idDiscord: String,
  role: {
    type: String,
    enum: ["member", "recruter", "commander", "admin", "headadmin"],
    default: "member",
  },
  points: Number,
});

const UsersModel = mongoose.model("users", UsersSchema);

export default UsersModel;
