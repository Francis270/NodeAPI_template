import { Response, Request, NextFunction } from 'express';
import { User, UserWithId, Users } from './user.model';

export const defaultUser = (req: Request, res: Response<User>, next: NextFunction) => {
    if (req.method !== "GET") {
        return res.sendStatus(403).end();
    }
    res.json({id: 0, name: ""});
}

export const findOne = async (req: Request, res: Response<UserWithId>, next: NextFunction) => {
    if (req.method !== "GET") {
        return res.sendStatus(403).end();
    }
    try {
        const id = parseInt(req.params.id);
        const result = await Users.findOne({ id });
        
        if (!result) {
            res.status(404);
            throw new Error(`User with id "${req.params.id}" not found.`);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}