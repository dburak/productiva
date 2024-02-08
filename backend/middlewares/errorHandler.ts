import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  const statusCode = response.statusCode !== 200 ? response.statusCode : 500;

  response.status(statusCode);

  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }

  const responseBody = {
    message: errorMessage,
  };

  console.log('Error: ', responseBody);

  response.json(responseBody);
}
