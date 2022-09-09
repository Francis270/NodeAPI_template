import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { NODE_ENV, SECRET_KEY } from './config';
import ErrorResponse from '../interfaces/ErrorResponse';
import CustomRequest from '../interfaces/CustomRequest';

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

export const auth = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.header('Authorization')?.replace('Bearer ', '');

		if (!token) {
			throw new Error('No token provided.');
		}
		const decoded = jwt.verify(token, SECRET_KEY);

		(req as CustomRequest).token = decoded;
		next();
	} catch (error) {
		res.status(401).send('Please authenticate');
	}
}