import { NextFunction, Request, Response } from 'express';
import { NODE_ENV } from './config';

import ErrorResponse from '../interfaces/ErrorResponse';

export const errorHandler = (err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) => {
	const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    const message = err.message || 'Something went wrong.';

	res.status(statusCode);
  	res.json({
	    message: message,
	    stack: NODE_ENV === 'production' ? '🥞' : err.stack
  	});
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
	const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  
	res.status(404);
	next(error);
}