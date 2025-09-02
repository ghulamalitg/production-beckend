import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config();
const app = express();


connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`App is running on server ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.error("Error in DB connection", error);
    process.exit(1);
})

/*
const app = express();
( async ()=>{
    try{
        mongoose.connect(`${process.env.DB_URI}/${DB_name}`);
        console.log("DB connected");
        app.on("error", (error) => {
            console.error("Error in DB connection", error);
            throw error;
        });
        app.listen(process.env.PORT, () => {
            console.log('App is running on server', process.env.PORT);
        })
    }
 catch(error){
 console.error("Error in DB connection", error);
 throw error;
};
})();
*/