const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const generateToken = (userId) => {  
  const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '23h' }); // Изменено на 1 час
  return token;
};
module.exports = generateToken