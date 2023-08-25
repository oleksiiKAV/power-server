const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMangooseError } = require("../helpers");

const diarySchema = new Schema(
  {
    date: {
      type: String,
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
          productId: {
            type: Schema.Types.ObjectId,
            ref: "product",
          },
          amount: {
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
    doneExersices: {
      type: [
        {
          exersice: {
            type: Schema.Types.ObjectId,
            ref: "exersice",
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
  date: Joi.string().required(),
  productId: Joi.string().required(),
  calories: Joi.number().required(),
  amount: Joi.number().required(),
});

const removeProductSchema = Joi.object({
  date: Joi.string().required(),
  product: Joi.string().required(),
});

const addExersiceSchema = Joi.object({
  date: Joi.string().required(),
  exersice: Joi.string().required(),
  time: Joi.number().required(),
});

const removeExersiceSchema = Joi.object({
  date: Joi.string().required(),
  exersice: Joi.string().required(),
});

const schemas = {
  addProductSchema,
  removeProductSchema,
  addExersiceSchema,
  removeExersiceSchema,
};

const Diary = model("diary", diarySchema);

module.exports = {
  schemas,
  Diary,
};
