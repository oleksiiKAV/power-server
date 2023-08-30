const { User } = require('../../models/user');

const deleteUser = async (req, res) => {
  const { _id } = req.user;
  const deletedUser = await User.findByIdAndRemove(_id);
  if (!deletedUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ message: 'User deleted successfully' });
};

module.exports = deleteUser;
