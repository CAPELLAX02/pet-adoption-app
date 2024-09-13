import express, { Express, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './config/database';
require('dotenv').config();
const PORT = process.env.PORT || 8001;

const app: Express = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/test', (req: Request, res: Response, next: NextFunction) => {
  res.send('Test API is working.');
});

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
