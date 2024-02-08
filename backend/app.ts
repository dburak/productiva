import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { connectToDatabase } from './database-connection';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
void connectToDatabase();

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

// Custom middleware to handle errors
app.use(errorHandler);

export default app;
