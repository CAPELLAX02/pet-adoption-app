import { Request, Response, NextFunction } from 'express';
import userModel, { IUser } from '../models/userModel';
import { ErrorHandler } from '../utils/ErrorHandler';
import { AsyncHandler } from '../middleware/AsyncHandler';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

interface IRegistirationBody {
  name: string;
  email: string;
  password: string;
}

interface ILoginBody {
  email: string;
  password: string;
}

export const registerUser = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password }: IRegistirationBody = req.body;

      const isEmailExist = await userModel.findOne({ email });

      if (isEmailExist) {
        return next(new ErrorHandler('Email already exists.', 400));
      }

      const user = await userModel.create({
        name,
        email,
        password,
      });

      const token = user.signAccessToken();

      res.status(201).json({
        success: true,
        user,
        token,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const loginUser = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password }: ILoginBody = req.body;

      const user = await userModel.findOne({ email }).select('+password');

      if (!user || !(await user.comparePassword(password))) {
        return next(new ErrorHandler('Invalid email or password.', 401));
      }

      const token = user.signAccessToken();

      res.status(200).json({
        success: true,
        user,
        token,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
