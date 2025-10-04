import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectToDB = async () => {
    try {
        const MONGODB_URI = ENV.MONGODB_URI;
        if (!MONGODB_URI) throw new Error("MONGO_URI is not set in .env");

        const connection = await mongoose.connect(MONGODB_URI);
        console.log("Connected to the MongoDB: " + connection.connection.host);
    } catch (error){
        console.log("Error appeared while connecting to MongoDB: " + error);
        process.exit(1); // express exit codes // code 1 - fail, code 0 - success
    }
}