import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { connectToDatabase } from './database-connection';
import { errorHandler } from './middlewares/errorHandler';

import usersRouter from './routes/users';
import loginRouter from './routes/login';

const app = express();
void connectToDatabase();

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

// routes
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

// Custom middleware to handle errors
app.use(errorHandler);

export default app;
