const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');

const defaultAvatar = 'http://localhost:3000/noname.png';

const updateUser = async (req, res) => {
  const { _id } = req.user;
  const { file } = req;
  const updateUser = { ...req.body, ...(file ? { avatar: file.path } : { avatar: defaultAvatar }) };
  const results = await User.findByIdAndUpdate(_id, updateUser, { new: true }).select('name email avatar bodyData token');
  res.json(results);
};

module.exports = updateUser;
