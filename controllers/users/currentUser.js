const {generateToken} = require("../../helpers/generateToken");
const jwt = require('jsonwebtoken');

const currentUser = async (req, res) => {
  const { _id, name, email, token, avatar, bodyData } = req.user;
  const tokenData = jwt.decode(token);
  const currentTime = Math.floor(Date.now() / 1000); 
  const tokenExpiration = tokenData.exp;

  if (tokenExpiration - currentTime < 300) {
    const newToken = generateToken(_id);
    await User.findByIdAndUpdate(_id, { token: newToken });
    res.json({ _id, name, email, token: newToken, avatar, bodyData });
  } else {
   
  res.json({ _id, name, email, token, avatar, bodyData });
}
};

module.exports = currentUser;
