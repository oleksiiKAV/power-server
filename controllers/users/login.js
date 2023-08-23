const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    throw HttpError(401, 'Email or password invalid');
  }
  const isCorrectPassword = await bcrypt.compare(password, foundUser.password);
  if (!isCorrectPassword) {
    throw HttpError(401, 'Email or password invalid');
  }
  const payload = { id: foundUser._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(foundUser._id, { token });
  res.status(200).json({ email: foundUser.email, name: foundUser.name, bodyData: foundUser.bodyData, token });
};

module.exports = login;
