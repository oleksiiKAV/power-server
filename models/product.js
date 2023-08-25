const { handleMangooseError } = require("../helpers");
const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    _id: {
      _id: false,
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      unique: true,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
      default: 0,
    },
    groupBloodNotAllowed: {
      _id: false,
      type: {
        1: {
          type: Boolean,
        },
        2: {
          type: Boolean,
        },
        3: {
          type: Boolean,
        },
        4: {
          type: Boolean,
        },
      },
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

productSchema.post("save", handleMangooseError);

const Product = model("product", productSchema);

module.exports = { Product };
