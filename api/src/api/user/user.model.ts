import { WithId } from 'mongodb';
import { db } from '../../db';

export interface User {
    id: number;
    name: string;
};

export type UserWithId = WithId<User>;
export const Users = db.collection<User>('users');
