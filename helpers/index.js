const HttpError = require("./HttpError");
const CtrlWrapper = require("./CtrlWrapper");
const handleMangooseError = require("./handleMangooseError");
const errorDateMessages = require("./errorDateMessages");
const errorProductMessages = require("./errorProductMessages");
const errorAmountMessages = require("./errorAmountMessages");
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
};
