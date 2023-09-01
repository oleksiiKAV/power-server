const HttpError = require("./HttpError");
const CtrlWrapper = require("./CtrlWrapper");
const handleMangooseError = require("./handleMangooseError");

const { dateRegexp, emailRegexp, passwordRegexp } = require("./dateRegexp");
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
} = require("./errorsUserModel");

const {
  errorDateMessages,
  errorProductMessages,
  errorAmountMessages,
  errorЕxerciseMessages,
  errorTimeMessages,
} = require("./errorsDiaryMessages");

module.exports = {
  HttpError,
  CtrlWrapper,
  handleMangooseError,
  errorDateMessages,
  errorProductMessages,
  errorAmountMessages,
  dateRegexp,
  emailRegexp,
  passwordRegexp,
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
  errorDateMessages,
  errorProductMessages,
  errorAmountMessages,
  errorЕxerciseMessages,
  errorTimeMessages,
};
