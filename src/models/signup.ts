import mongoose, { Schema } from "mongoose";

const SignUpSchema = new Schema({
  date: String,
  lineup_1: [String],
  lineup_2: [String],
  lineup_3: [String],
  lineup_4: [String],
});

const SignUp = mongoose.models.SignUp || mongoose.model("SignUp", SignUpSchema);

export default SignUp;
