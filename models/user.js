
const { emailRegexp, passwordRegexp} = require("../helpers");
const {
  errorUserModelName,
  errorUserModelEmail,
  errorUserModelPassw,
  errorUserModelUpdateName,
  errorUserModelUpdateAvatar,
  errorUserModelHeight,
  errorUserModelCurrentWeight,
  errorUserModelDesiredWeight,
  errorUserModelBirthday,
  errorUserModelBlood,
  errorUserModelSex,
  errorUserModelLevelActivity,
} = require("../helpers");
const { handleMangooseError, HttpError } = require("../helpers");
const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name"],
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 7,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      required: false,
      default:"",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },

    bodyData: {
      _id: false,
      type: {
        height: {
          type: Number,
          min: 150,
        },
        currentWeight: {
          type: Number,
          min: 35,
        },
        desiredWeight: {
          type: Number,
          min: 35,
        },
        birthday: {
          type: Date,
          validate: {
            validator: function (value) {
              const today = new Date();
              const ageThreshold = new Date(
                today.getFullYear() - 18,
                today.getMonth(),
                today.getDate()
              );
              return value <= ageThreshold;
            },
            message: "The person must be 18 years or older.",
          },
        },
        blood: {
          type: Number,
          enum: [1, 2, 3, 4],
        },
        sex: {
          type: String,
          enum: ["male", "female"],
        },
        levelActivity: {
          type: Number,
          enum: [1, 2, 3, 4, 5],
        },
        dailyRateCalories: {
          type: Number,
        },
        dailySportMin: {
          type: Number,
          default: 110,
        },
      },
      required: false,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMangooseError);

const registerSchema = Joi.object({
  name: Joi.string().required().empty(false).messages( errorUserModelName ),
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .empty(false)
    .messages(errorUserModelEmail ),
  password: Joi.string()
    .pattern(passwordRegexp)
    .min(7)
    .required()
    .empty(false)
    .messages( errorUserModelPassw ),
});
const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .empty(false)
    .messages( errorUserModelEmail ),
  password: Joi.string()
    .pattern(passwordRegexp)
    .min(7)
    .required()
    .empty(false)
    .messages( errorUserModelPassw ),
});
const updateSchema = Joi.object({
  name: Joi.string().empty(false).messages( errorUserModelUpdateName ),
  avatar: Joi.string().empty(false).messages( errorUserModelUpdateAvatar ),
});
const addBodyDataSchema = Joi.object({
  height: Joi.number().min(150).required().messages( errorUserModelHeight ),
  currentWeight: Joi.number()
    .min(35)
    .required()
    .messages( errorUserModelCurrentWeight ),
  desiredWeight: Joi.number()
    .min(35)
    .required()
    .messages( errorUserModelDesiredWeight ),
  birthday: Joi.date()
    .raw()
    .required()
    .custom((value) => {
      const currentDate = new Date();
      const eighteenYearsAgo = currentDate.getFullYear() - 18;
      if (value.getFullYear() <= eighteenYearsAgo) {
        return value;
      } else {
        throw HttpError(400, "The person must be 18 years or older");
      }
    })
    .messages( errorUserModelBirthday ),
  blood: Joi.number()
    .valid(1, 2, 3, 4)
    .required()
    .messages( errorUserModelBlood ),
  sex: Joi.string()
    .valid("male", "female")
    .required()
    .messages( errorUserModelSex ),
  levelActivity: Joi.number()
    .valid(1, 2, 3, 4, 5)
    .required()
    .messages( errorUserModelLevelActivity ),
});

const User = model("user", userSchema);
const schemas = {
  registerSchema,
  loginSchema,
  updateSchema,
  addBodyDataSchema,
};

module.exports = { User, schemas };
