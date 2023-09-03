const express = require('express');
const ctrl = require('../../controllers/users');
const {googleAuth,googleRedirect} =  require('../../controllers/users/authGoogle');
const { validateBody, authenticate, upload} = require('../../middlewares');
const { schemas } = require('../../models/user');
const router = express.Router();
const {  CtrlWrapper } = require('../../helpers');

router.post('/signup', validateBody(schemas.registerSchema), ctrl.register);
router.post('/signin', validateBody(schemas.loginSchema), ctrl.login);
router.get('/current', authenticate, ctrl.currentUser);
router.post('/current/edit', authenticate, upload.single('avatar'), validateBody(schemas.updateSchema), ctrl.updateUser);

router.post('/body', authenticate, validateBody(schemas.addBodyDataSchema), ctrl.addBodyData);
router.post('/signout', authenticate, ctrl.logout);
router.delete('/delete', authenticate, ctrl.delete);

router.get("/google", CtrlWrapper(googleAuth));
router.get("/google/google-redirect", CtrlWrapper(googleRedirect));

module.exports = router;
