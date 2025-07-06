import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { error } from "console";
dotenv.config({
    Path: "./.env"
});

connectDB().then(() => {
    app.listen( process.env.PORT || 8000, () => {
        console.log(`Server is running on Port: ${process.env.PORT || 8000}`);
    })
}).catch((error) => {
    console.log("DataBase Connection falied !!!", error);
})
   