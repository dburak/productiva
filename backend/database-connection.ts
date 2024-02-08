import mongoose from 'mongoose';
import config from './utils/config';

const mongoUrl = config.MONGODB_URI;

export async function connectToDatabase() {
  try {
    if (mongoUrl) {
      await mongoose.connect(mongoUrl);
      console.log('Connected to MongoDB');
    } else {
      console.error('MongoDB URI is undefined');
    }
  } catch (error: unknown) {
    let errorMessage = 'Error connecting to MongoDB';

    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.error(errorMessage);
  }
}
