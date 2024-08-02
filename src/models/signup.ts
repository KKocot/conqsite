import mongoose, { Schema } from "mongoose";

const SignUpSchema = new Schema({
  date: String,
  lineup_1: [String], //Magic
  lineup_2: [String], //King's Order
  lineup_3: [String], //Krolewska Tarcza
  lineup_4: [String], //Zielona Piechota
  lineup_5: [String], //Erebus 1
  lineup_6: [String], //Erebus 2
  lineup_7: [String], //BlackForge 1
  lineup_8: [String], //BlackForge 2
});

const SignUp = mongoose.models.SignUp || mongoose.model("SignUp", SignUpSchema);

export default SignUp;
