import { Response, Request, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User, UserWithId, Users } from './user.model';
import MessageResponse from './../../interfaces/MessageResponse';
import { SECRET_KEY, SALT_ROUNDS } from './../../utils/config';

export const signUp = async (req: Request, res: Response<MessageResponse>, next: NextFunction) => {
    if (req.body.username === undefined || req.body.password === undefined) {
        return res.sendStatus(400).end();
    }
    try {
        const username = req.body.username;
        const password = req.body.password;
        
        const exists = await Users.findOne({ username });
        if (exists) {
            throw new Error('Username already taken.');
        }

        const hash = await bcrypt.hash(password, SALT_ROUNDS);
        const insertRes = await Users.insertOne({
            username: username,
            hash: hash
        });

        if (!insertRes.acknowledged) {
            throw new Error('Error inserting user.');
        }
        res.status(201);
        res.json({
            message: `User ${username} has been created.`
        });
    } catch (error) {
        next(error);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.username === undefined || req.body.password === undefined) {
        return res.sendStatus(400).end();
    }
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await Users.findOne({ username: username });
        
        if (!user) {
            res.status(404);
            throw new Error(`User "${username}" not found.`);
        }
        if (bcrypt.compareSync(password, user.hash!)) {
            const token = jwt.sign({
                _id: user._id?.toString(),
                username: user.username
            }, SECRET_KEY, {
                expiresIn: '2 days'
            });
            
            res.json({
                username: user.username,
                token: token
            });
        } else {
            throw new Error('Wrong password.');
        }
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req: Request, res: Response<User>, next: NextFunction) => {
    try {
        const username = req.params.username;
        const user = await Users.findOne({ username: username });
        
        if (!user) {
            res.status(404);
            throw new Error(`User "${username}" not found.`);
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req: Request, res: Response<MessageResponse>, next: NextFunction) => {
    try {
        const username = req.params.username;
        const user = await Users.findOne({ username: username });
        
        if (!user) {
            res.status(404);
            throw new Error(`User "${username}" not found.`);
        }
        await Users.deleteOne({ username: user.username });
        res.json({
            message: `User ${user.username} deleted.`
        });
    } catch (error) {
        next(error);
    }
}

export const changeUsername = async (req: Request, res: Response<MessageResponse>, next: NextFunction) => {
    if (req.body.username === undefined || req.body.newusername === undefined) {
        return res.sendStatus(400).end();
    }
    try {
        const username = req.body.username;
        const newusername = req.body.newusername;

        if (username === newusername) {
            throw new Error('New username must be different from actual one.');
        }
        const user = await Users.findOne({ username: username });
        
        if (!user) {
            res.status(404);
            throw new Error(`User "${username}" not found.`);
        }
        await Users.updateOne({ username: user.username }, {
            $set: {
                username: newusername
            }
        });
        res.json({
            message: `New username set to ${newusername}.`
        });
    } catch (error) {
        next(error);
    }
}

export const changePassword = async (req: Request, res: Response<MessageResponse>, next: NextFunction) => {
    if (req.body.username === undefined || req.body.newpassword === undefined) {
        return res.sendStatus(400).end();
    }
    try {
        const username = req.body.username;
        const newpassword = req.body.newpassword;

        const user = await Users.findOne({ username: username });
        
        if (!user) {
            res.status(404);
            throw new Error(`User "${username}" not found.`);
        }
        const hash = await bcrypt.hash(newpassword, SALT_ROUNDS);

        await Users.updateOne({ username: user.username }, {
            $set: {
                hash: hash
            }
        });
        res.json({
            message: 'New password set.'
        });
    } catch (error) {
        next(error);
    }
}