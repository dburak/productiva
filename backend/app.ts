import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { connectToDatabase } from './database-connection';
import { errorHandler } from './middlewares/errorHandler';

import usersRouter from './routes/users';
import loginRouter from './routes/login';
import companiesRouter from './routes/companies';
import productsRouter from './routes/products';

const app = express();
connectToDatabase();

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

// routes
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/companies', companiesRouter);
app.use('/api/products', productsRouter);

// Custom middleware to handle errors
app.use(errorHandler);

export default app;
