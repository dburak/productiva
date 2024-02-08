import dotenv from 'dotenv';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
dotenv.config();

const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI;
const HOST_URL = process.env.HOST_URL || 'http://localhost:3003';

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not set');
}

const config = {
  PORT,
  MONGODB_URI,
  HOST_URL,
};

export default config;
