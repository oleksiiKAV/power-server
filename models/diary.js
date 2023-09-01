const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMangooseError, dateRegexp } = require("../helpers");
const { validateDateInPast } = require("../middlewares");
const {
  errorDateMessages,
  errorProductMessages,
  errorAmountMessages,
  errorЕxerciseMessages,
  errorTimeMessages,
} = require("../helpers");

const diarySchema = new Schema(
  {
    date: {
      type: String,
      match: dateRegexp,
      required: true,
    },
    consumedCalories: {
      type: Number,
      required: true,
      default: 0,
    },
    consumedProducts: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "product",
          },
          amount: {
            type: Number,
            required: true,
          },
          calories: {
            type: Number,
            required: true,
          },
        },
      ],
      default: [],
      required: true,
    },
    burnedCalories: {
      type: Number,
      required: true,
      default: 0,
    },
    timeSport: {
      type: Number,
      required: true,
      default: 0,
    },
    doneExercises: {
      type: [
        {
          exercise: {
            type: Schema.Types.ObjectId,
            ref: "exercise",
          },
          time: Number,
          burnedCalories: Number,
        },
      ],
      required: true,
      default: [],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

diarySchema.post("save", handleMangooseError);

const addProductSchema = Joi.object({
  date: Joi.string()
    .required()
    .empty(false)
    .pattern(dateRegexp)
    .custom(validateDateInPast)
    .messages(errorDateMessages),
  product: Joi.string().required().messages(errorProductMessages),
  amount: Joi.number().min(1).required().messages(errorAmountMessages),
});

const removeProductSchema = Joi.object({
  date: Joi.string()
    .required()
    .empty(false)
    .pattern(dateRegexp)
    .custom(validateDateInPast)
    .messages(errorDateMessages),
  product: Joi.string().required().messages(errorProductMessages),
});

const addExerciseSchema = Joi.object({
  date: Joi.string()
    .required()
    .empty(false)
    .pattern(dateRegexp)
    .custom(validateDateInPast)
    .messages(errorDateMessages),
  exercise: Joi.string().required().messages(errorЕxerciseMessages),
  time: Joi.number().required().messages(errorTimeMessages),
});

const removeExerciseSchema = Joi.object({
  date: Joi.string()
    .required()
    .empty(false)
    .pattern(dateRegexp)
    .custom(validateDateInPast)
    .messages(errorDateMessages),
  exercise: Joi.string().required().messages(errorЕxerciseMessages),
});

const schemas = {
  addProductSchema,
  removeProductSchema,
  addExerciseSchema,
  removeExerciseSchema,
};

const Diary = model("diary", diarySchema);

module.exports = {
  schemas,
  Diary,
};
