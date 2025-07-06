import express from 'express'
import mongoose from 'mongoose'
import { DB_Name } from '../constants.js';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
          `${process.env.MONGO_DB}/${DB_Name}`
        );
        console.log(`MongoDb is Connected || DB Host: ${connectionInstance.connection.host}`);
    }
    catch (error) {
        console.log("MongoDb connection error", error);
        process.exit(1)
    }
}
export default connectDB;