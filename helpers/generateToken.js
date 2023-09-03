const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const generateToken = (userId) => {  
  const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '23h' }); 
  return token;
};
module.exports = generateToken