import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || 'mongodb://localhost/api'

export const client = new MongoClient(uri);
export const db = client.db();