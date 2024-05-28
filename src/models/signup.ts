import mongoose, { Schema } from "mongoose";

const SignUpSchema = new Schema({
  date: String,
  lineup_one: { username: String, id: String },
  lineup_two: { username: String, id: String },
  lineup_tree: { username: String, id: String },
  lineup_four: { username: String, id: String },
});

const SignUp = mongoose.models.Users || mongoose.model("signUp", SignUpSchema);

export default SignUp;
