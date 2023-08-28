const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema(
  {
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

const Exercise = model("exercise", exerciseSchema);

module.exports = Exercise;
