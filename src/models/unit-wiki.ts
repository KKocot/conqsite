import mongoose, { Schema } from "mongoose";

const UnitWikiSchema: Schema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  authors: { type: [String], required: true },
  era: { type: String, required: true },
  image: { type: String, required: true },
  leadership: { type: Number, required: true },
  value: { type: [Number], required: true },
  masteryPoints: { type: Boolean, required: true },
  maxlvl: { type: Number, required: true },
  kits: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true },
    },
  ],
  season: {
    number: { type: Number, required: true },
    name: { type: String, required: true },
  },
  description: { type: String, required: true },
  skills: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true },
    },
  ],
  challenges: [
    {
      tier: { type: Number, required: true },
      quests: { type: [String], required: true },
    },
  ],
  formations: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true },
    },
  ],
  treeStructure: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      img: { type: String, required: true },
      prev: { type: Number, default: null },
      id: { type: Number, required: true },
      value: { type: Number, required: true },
    },
  ],
});

const UnitWiki =
  mongoose.models.UnitWiki || mongoose.model("UnitWiki", UnitWikiSchema);

export default UnitWiki;
