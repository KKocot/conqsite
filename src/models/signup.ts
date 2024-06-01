import mongoose, { Schema } from "mongoose";

const SignUpSchema = new Schema({
  date: String,
  1: [String],
  2: [String],
  3: [String],
  4: [String],
});

const SignUp = mongoose.models.SignUp || mongoose.model("SignUp", SignUpSchema);

export default SignUp;
