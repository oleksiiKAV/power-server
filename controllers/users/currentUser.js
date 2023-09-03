const {generateToken} = require("../../helpers/generateToken");
const jwt = require('jsonwebtoken');

const currentUser = async (req, res) => {
  const { _id, name, email, token, avatar, bodyData,createdAt, updatedAt } = req.user;
  const tokenData = jwt.decode(token);
  const currentTime = Math.floor(Date.now() / 1000); 
  const tokenExpiration = tokenData.exp;

  if (tokenExpiration - currentTime < 300) {
    const newToken = generateToken(_id);
    await User.findByIdAndUpdate(_id, { token: newToken, updatedAt:Date.now() });
    res.json({ _id, name, email, token: newToken, avatar, bodyData, createdAt, updatedAt});
  } else {
   
  res.json({ _id, name, email, token, avatar, bodyData,  createdAt, updatedAt });
}
};

module.exports = currentUser;
