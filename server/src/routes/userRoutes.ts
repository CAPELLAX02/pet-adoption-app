import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';
// import { isAuthenticated } from '../middleware/AuthMiddleware';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

export default userRouter;
