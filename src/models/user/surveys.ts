import mongoose, { Schema } from "mongoose";

const SurveySchema = new Schema({
  discordNick: { type: String, required: true },
  updates: { type: [String], required: false },
  inGameNick: { type: String, required: true },
  discordId: { type: String, required: true },
  characterLevel: { type: String, required: true },
  house: { type: [String], required: false },
  avatar: { type: String, required: false },
  artyAmount: {
    type: String,
    enum: ["none", "some", "average", "aLot"],
    required: true,
  },
  weapons: [
    {
      value: { type: Boolean, required: true },
      leadership: { type: Number, required: true },
      pref: { type: Number, required: false },
    },
  ],
  units: {
    low: [
      {
        id: { type: Number, required: true },
        value: { type: String, required: true },
        reduceCost: { type: Boolean, required: false },
      },
    ],
    heroic: [
      {
        id: { type: Number, required: true },
        value: { type: String, required: true },
        reduceCost: { type: Boolean, required: false },
      },
    ],
    golden: [
      {
        id: { type: Number, required: true },
        value: { type: String, required: true },
        reduceCost: { type: Boolean, required: false },
      },
    ],
  },
});

const Survey = mongoose.models.Survey || mongoose.model("Survey", SurveySchema);

export default Survey;
