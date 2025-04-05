import mongoose, { Schema } from "mongoose";

const RateSchema = new Schema({
  unit: { type: String, required: true },
  votes: [
    {
      id: { type: String, required: true },
      rate: { type: Number, required: true },
    },
  ],
});

const Rate = mongoose.models.Rate || mongoose.model("Rate", RateSchema);

export default Rate;
