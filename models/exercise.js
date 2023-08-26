const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    bodyPart: {
      type: String,
      required: true,
    },
    equipment: {
      type: String,
      required: true,
    },
    gifUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    burnedCalories: {
      type: Number,
      required: false,
    },
    time: {
      type: Number,
      required: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
