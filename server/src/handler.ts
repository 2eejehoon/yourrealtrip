import serverless from 'serverless-http';
import express from 'express';

import cors from 'cors';
import morgan from 'morgan';
import { reviewRouter, userRouter } from './router';

// const isDev = process.env.IS_OFFLINE;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.get('/', (_, res) => {
  return res.status(200).json({
    message: 'health check',
  });
});

app.use('/api/reviews', reviewRouter);
app.use('/api/users', userRouter);

app.use((_, res) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

export const handler = serverless(app);
