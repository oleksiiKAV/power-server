const errorDateMessages = {
  "string.base": "The date must be a string.",
  "any.required": "The date field is required.",
  "string.empty": "The date must not be empty",
  "string.pattern.base": 'The date must be in the format "DD-MM-YYYY"',
  "date.inPast": "Date must not be in the future",
};

const errorProductMessages = {
  "string.base": "The product must be a string.",
  "any.required": "The product field is required.",
  "string.empty": "The product must not be empty.",
};

const errorЕxerciseMessages = {
  "string.base": "The exercise must be a string.",
  "any.required": "The exercise field is required.",
  "string.empty": "The exercise  must not be empty.",
};

const errorAmountMessages = {
  "number.base": "The amount must be a number.",
  "any.required": "The amount field is required.",
  "number.min": "The amount must be greater than 0.",
};

const errorTimeMessages = {
  "string.base": "The time must be a string.",
  "any.required": "The time field is required.",
  "string.empty": "The time field must be filled",
};

module.exports = {
  errorTimeMessages,
  errorDateMessages,
  errorProductMessages,
  errorЕxerciseMessages,
  errorAmountMessages,
};
