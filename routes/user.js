const userRouter = require('express').Router();
const { getUser, updateUserInfo, getUserById } = require('../controllers/user');
const { validateUserId } = require('../middlewares/validators');

userRouter.get('/', getUser);
userRouter.patch('/me', updateUserInfo);
userRouter.get('/:userId', validateUserId, getUserById);

module.exports = userRouter;
