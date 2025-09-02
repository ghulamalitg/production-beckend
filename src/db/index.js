import mongoose from "mongoose";
import { DB_name } from "../constant.js";


const connectDB = async () =>{
    try {
    const  connectionInstance = await mongoose.connect(`${process.env.DB_URI}/${DB_name}`);
    console.log(`DB Connection Successful to ${DB_name} || DB_HOST: ${connectionInstance.connection.host}`);
}catch (error){
    console.error("Error in DB connection",error);
    process.exit(1);
};
}

export default connectDB;