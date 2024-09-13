import mongoose from 'mongoose';

const mongoUri: string = process.env.MONGO_URI || '';

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri).then((data: any) => {
      console.log(`Database connected - ${data.connection.host}`);
    });
  } catch (error: any) {
    console.log(`Database connection failed: ${error.message}`);
    setTimeout(connectDB, 5000);
  }
};
