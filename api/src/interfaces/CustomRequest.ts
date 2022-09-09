import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export default interface CustomRequest extends Request {
    token: string | JwtPayload;
}