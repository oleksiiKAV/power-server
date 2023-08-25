const { handleMangooseError } = require("../helpers");
const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productSchema = new Schema(
  {
    weight: {
      type: Number,
      required: [true, "Set weight"],
    },
    calories: {
      type: Number,
      required: [true, "Set calories"],
    },
    category: {
      type: String,
      required: [true, "Set category"],
    },
    title: {
      type: String,
      required: true,
    },
    groupBloodNotAllowed: {
      type: Object,
      select: true,
      enum: [1, 2, 3, 4],
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

productSchema.post("save", handleMangooseError);

const addProductSchema = Joi.object({
  weight: Joi.number().required(),
  calories: Joi.number().required(),
  category: Joi.string().required(),
  title: Joi.string().required(),
  groupBloodNotAllowed: Joi.number().required(),
});

const Product = model("product", productSchema);

const schemas = { addProductSchema };

module.exports = { Product, schemas };
