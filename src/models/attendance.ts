import mongoose, { Schema } from "mongoose";

const AttendanceSchema = new Schema({
  date: String,
  house: String,
  lineup: [
    {
      name: String,
      signup: [String],
    },
  ],
});

const Attendance =
  mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);

export default Attendance;
