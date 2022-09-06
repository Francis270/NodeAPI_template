import { WithId } from 'mongodb';
import * as z from 'zod';
import { db } from '../../db';

const User = z.object({
    id: z.number().int(),
    name: z.string().min(1)
});

export type User = z.infer<typeof User>;
export type UserWithId = WithId<User>;
export const Users = db.collection<User>('users');
