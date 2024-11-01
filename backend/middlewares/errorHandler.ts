import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  let errorMessage = 'Something went wrong';

  if (error instanceof ZodError) {
    response.status(400).json({ error: error.errors });
  } else if (error instanceof Error) {
    errorMessage = error.message;
    response.status(500).json({
      errorMessage,
    });
  } else {
    response.status(500).json({ error: errorMessage });
  }
}
