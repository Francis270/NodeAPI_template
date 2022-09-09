import { WithId } from 'mongodb';
import { db } from '../../db';

export class User {
    username?: string;
    hash?: string;
};
export type UserWithId = WithId<User>;
export const Users = db.collection<User>('users');
