function validateDateInPast(value, helpers) {
  const currentDate = Date.now();
  const dateParts = value.split("-");
  const standardFormatDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  const date = new Date(standardFormatDate);

  if (date <= currentDate) {
    return value;
  } else {
    return helpers.error("date.inPast");
  }
}

module.exports = validateDateInPast;
