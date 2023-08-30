const {  CtrlWrapper } = require('../../helpers');
const register = require('./register');
const login = require('./login');
const currentUser = require('./currentUser');
const updateUser = require('./updateUser');
const addBodyData = require('./addBodyData');
const logout = require('./logout');
const deleteUser = require('./deleteUser');

module.exports = {
  register: CtrlWrapper(register),
  login: CtrlWrapper(login),
  currentUser: CtrlWrapper(currentUser),
  updateUser: CtrlWrapper(updateUser),
  addBodyData: CtrlWrapper(addBodyData),
  logout: CtrlWrapper(logout),
  delete: CtrlWrapper(deleteUser),
};
