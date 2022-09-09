require('dotenv').config();

export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const MONGO_URI = process.env.MONGO_URI || null;
export const SECRET_KEY = process.env.SECRET_KEY || 'secret';
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS!) || 8;
