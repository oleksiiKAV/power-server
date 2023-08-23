const express = require('express');
const ctrl = require('../../controllers/users');
const { validateBody, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');
const router = express.Router();

router.post('/signup', validateBody(schemas.registerSchema), ctrl.register);
router.post('/signin', validateBody(schemas.loginSchema), ctrl.login);
router.get('/current', authenticate, ctrl.currentUser);
router.patch('/current/edit', authenticate, upload.single('avatar'), validateBody(schemas.updateSchema), ctrl.updateUser);
router.post('/body', authenticate, validateBody(schemas.addBodyDataSchema), ctrl.addBodyData);
router.post('/signout', authenticate, ctrl.logout);

module.exports = router;
