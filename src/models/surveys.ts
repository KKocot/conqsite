const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SurveySchema = new Schema({
  discordNick: { type: String, required: true },
  inGameNick: { type: String, required: true },
  characterLevel: { type: Number, required: true },
  artyAmount: {
    type: String,
    enum: ["none", "some", "average", "aLot"],
    required: true,
  },
  weapons: [
    {
      value: { type: Boolean, required: true },
      leadership: { type: Number, required: true },
    },
  ],
  units: {
    low: [
      {
        id: { type: Number, required: true },
        value: { type: String, required: true },
      },
    ],
    heroic: [
      {
        id: { type: Number, required: true },
        value: { type: String, required: true },
      },
    ],
    golden: [
      {
        id: { type: Number, required: true },
        value: { type: String, required: true },
      },
    ],
  },
});

const Survey = mongoose.model("Survey", SurveySchema);

export default Survey;
