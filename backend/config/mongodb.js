import { MongoClient } from 'mongodb';

// Connection URL
const MONGO_URI = process.env.MONGO_URI
// Database Name
const DB_NAME = process.env.DB_NAME

let client;

export async function connectToMongoDB() {
    if (!client) {
        client = new MongoClient(MONGO_URI);
    }
    try {
        await client.connect();
        return client.db(DB_NAME);
    } catch (error) {
        throw error;
    }
}