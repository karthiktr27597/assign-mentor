import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();


const mongoConnectString = process.env.MONGO_URL

export async function dbConnection() {
    const client = new MongoClient(mongoConnectString);
    client.connect();
    console.log("MongoDB connected successfully")
    return client
}

export const dbClient = await dbConnection();
