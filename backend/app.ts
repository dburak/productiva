import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { connectToDatabase } from './database-connection';
import { errorHandler } from './middlewares/errorHandler';

import usersRouter from './routes/users';
import loginRouter from './routes/login';
import companiesRouter from './routes/companies';
import productsRouter from './routes/products';
import homepageRouter from './routes/homepage';

const app = express();
connectToDatabase();

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// routes
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/companies', companiesRouter);
app.use('/api/products', productsRouter);
app.use('/api/homepage', homepageRouter);

// Custom middleware to handle errors
app.use(errorHandler);

export default app;
