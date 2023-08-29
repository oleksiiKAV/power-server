function validateDateInPast(value, helpers) {
  const currentDate = new Date();
  const inputDate = new Date(value);

  if (inputDate <= currentDate) {
    return value;
  } else {
    return helpers.error("date.inPast");
  }
}

module.exports = validateDateInPast;
