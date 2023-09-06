const errorUserModelName = {
  "string.base": "The name must be a string.",
  "any.required": "The name field is required.",
  "string.empty": "The name must not be empty",
};
const errorUserModelEmail = {
  "string.base": "The email must be a string.",
  "any.required": "The email field is required.",
  "string.empty": "The email must not be empty",
  "string.pattern.base": "The email must be in format test@gmail.com.",
};
const errorUserModelPassw = {
  "string.base": "The password must be a string.",
  "any.required": "The password field is required.",
  "string.empty": "The password must not be empty.",
  "string.min": "The password must be not less 7 symbols.",
  "string.pattern.base":
    "The password must consist of 6 English letters and 1 number.",
};
const errorUserModelUpdateName = {
  "string.base": "The name must be a string.",
  "string.empty": "The name must not be empty",
};
const errorUserModelUpdateAvatar = {
  "string.base": "The name must be a string.",
};
const errorUserModelHeight = {
  "number.base": "The height must be a number.",
  "number.min": "The height must be at least 150.",
  "any.required": "The height field is required.",
};
const errorUserModelCurrentWeight = {
  "number.base": "The current weight must be a number.",
  "number.min": "The current weight must be at least 35.",
  "any.required": "The current weight field is required.",
};
const errorUserModelDesiredWeight = {
  "number.base": "The desired weight must be a number.",
  "number.min": "The desired weight must be at least 35.",
  "any.required": "The desired weight field is required.",
};
const errorUserModelBirthday = {
  "date.base": "The birthday must be a valid date.",
  "any.required": "The birthday field is required.",
};
const errorUserModelBlood = {
  "number.base": "The blood type must be a number",
  "any.only": "Invalid blood type. Allowed values are 1, 2, 3, or 4.",
  "any.required": "The blood type field is required",
};
const errorUserModelSex = {
  "string.base": "The sex must be a string.",
  "any.only": "Invalid sex. Allowed values are male or female.",
  "any.required": "The sex field is required",
};
const errorUserModelLevelActivity = {
  "number.base": "The level activity must be a number",
  "any.only": "Invalid level activity. Allowed values are 1, 2, 3, 4 or 5.",
  "any.required": "The level activity field is required",
};
module.exports = {
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
};
