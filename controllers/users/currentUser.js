const currentUser = async (req, res) => {
  const { _id, name, email, token, avatar, bodyData } = req.user;
  res.json({ _id, name, email, token, avatar, bodyData });
};

module.exports = currentUser;
