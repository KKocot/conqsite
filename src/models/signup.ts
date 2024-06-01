import mongoose, { Schema } from "mongoose";

const SignUpSchema = new Schema({
  date: String,
  lineup_one: [String],
  lineup_two: [String],
  lineup_tree: [String],
  lineup_four: [String],
});

const SignUp = mongoose.models.SignUp || mongoose.model("SignUp", SignUpSchema);

export default SignUp;
