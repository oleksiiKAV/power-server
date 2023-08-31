const { handleMangooseError, HttpError } = require('../helpers');
const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const passwordRegexp = /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name'],
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
      default: '',
    },
    avatar: {
      type: String,
      required: true,
      default: 'https://res.cloudinary.com/dhgbndjlm/image/upload/v1693235748/avatars/kvn40yxqcamrcdhilafx.png',
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
              const ageThreshold = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
              return value <= ageThreshold;
            },
            message: 'The person must be 18 years or older.',
          },
        },
        blood: {
          type: Number,
          enum: [1, 2, 3, 4],
        },
        sex: {
          type: String,
          enum: ['male', 'female'],
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
  { versionKey: false, timestamps: true },
);

userSchema.post('save', handleMangooseError);

const registerSchema = Joi.object({
  name: Joi.string().required().empty(false).messages({
    'string.base': 'The name must be a string.',
    'any.required': 'The name field is required.',
    'string.empty': 'The name must not be empty',
  }),
  email: Joi.string().pattern(emailRegexp).required().empty(false).messages({
    'string.base': 'The email must be a string.',
    'any.required': 'The email field is required.',
    'string.empty': 'The email must not be empty',
    'string.pattern.base': 'The email must be in format test@gmail.com.',
  }),
  password: Joi.string().pattern(passwordRegexp).min(7).required().empty(false).messages({
    'string.base': 'The password must be a string.',
    'any.required': 'The password field is required.',
    'string.empty': 'The password must not be empty.',
    'string.min': 'The password must be not less 7 symbols.',
    'string.pattern.base': 'The password must consist of 6 English letters and 1 number.',
  })
});
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().empty(false).messages({
    'string.base': 'The email must be a string.',
    'any.required': 'The email field is required.',
    'string.empty': 'The email must not be empty',
    'string.pattern.base': 'The email must be in format test@gmail.com.',
  }),
  password: Joi.string().pattern(passwordRegexp).min(7).required().empty(false).messages({
    'string.base': 'The password must be a string.',
    'any.required': 'The password field is required.',
    'string.empty': 'The password must not be empty.',
    'string.min': 'The password must be not less 7 symbols.',
    'string.pattern.base': 'The password must consist of 6 English letters and 1 number.',
  })
});
const updateSchema = Joi.object({
  name: Joi.string().empty(false).messages({
    'string.base': 'The name must be a string.',
    'string.empty': 'The name must not be empty',
  }),
  avatar: Joi.string().empty(false).messages({
    'string.base': 'The name must be a string.',
    'string.empty': 'The file pathname must not be empty',
  })
});
const addBodyDataSchema = Joi.object({
  height: Joi.number().min(150).required().messages({
    'number.base': 'The height must be a number.',
    'number.min': 'The height must be at least 150.',
    'any.required': 'The height field is required.',
  }),
  currentWeight: Joi.number().min(35).required().messages({
    'number.base': 'The current weight must be a number.',
    'number.min': 'The current weight must be at least 35.',
    'any.required': 'The current weight field is required.',
  }),
  desiredWeight: Joi.number().min(35).required().messages({
    'number.base': 'The desired weight must be a number.',
    'number.min': 'The desired weight must be at least 35.',
    'any.required': 'The desired weight field is required.',
  }),
  birthday: Joi.date()
    .raw()
    .required()
    .custom((value) => {
      const currentDate = new Date();
      const eighteenYearsAgo = currentDate.getFullYear() - 18;
      if (value.getFullYear() <= eighteenYearsAgo) {
        return value;
      } else {
        throw HttpError(400, 'The person must be 18 years or older');
      }
    })
    .messages({
      'date.base': 'The birthday must be a valid date.',
      'any.required': 'The birthday field is required.',
    }),
  blood: Joi.number().valid(1, 2, 3, 4).required().messages({
    'number.base': 'The blood type must be a number',
    'any.only': 'Invalid blood type. Allowed values are 1, 2, 3, or 4.',
    'any.required': 'The blood type field is required',
  }),
  sex: Joi.string().valid('male', 'female').required().messages({
    'string.base': 'The sex must be a string.',
    'any.only': 'Invalid sex. Allowed values are male or female.',
    'any.required': 'The sex field is required',
  }),
  levelActivity: Joi.number().valid(1, 2, 3, 4, 5).required().messages({
    'number.base': 'The level activity must be a number',
    'any.only': 'Invalid level activity. Allowed values are 1, 2, 3, 4 or 5.',
    'any.required': 'The level activity field is required',
  }),
});

const User = model('user', userSchema);
const schemas = { registerSchema, loginSchema, updateSchema, addBodyDataSchema };

module.exports = { User, schemas };
