import mongoose, { Schema } from "mongoose";

const SignUpSchema = new Schema({
  date: String,
  lineup_1: [String], //Magic
  lineup_2: [String], //King's Order
  lineup_3: [String], //Krolewska Tarcza
  lineup_4: [String], //erebus 1
  lineup_5: [String], //erebus 2
});

const SignUp = mongoose.models.SignUp || mongoose.model("SignUp", SignUpSchema);

export default SignUp;
