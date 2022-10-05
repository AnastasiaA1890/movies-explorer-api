const userRouter = require('express').Router();
const { getUser, updateUserInfo } = require('../controllers/user');
const { validateProfileUpdate } = require('../middlewares/validators');

userRouter.get('/me', getUser);
userRouter.patch('/me', validateProfileUpdate, updateUserInfo);

module.exports = userRouter;
