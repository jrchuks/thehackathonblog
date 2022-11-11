import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
import router from "./routes/user-routes";
import cors from "cors";



const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/user",router);

app.use("/api/blog",blogRouter);

mongoose
    .connect(
        "mongodb+srv://jrchuks:THISISarea51@verbose.t3zmev3.mongodb.net/Verbose?retryWrites=true&w=majority"
    )
    .then(()=>app.listen(7000))
    .then(()=>
        console.log("Connected to database and listening to localhost 7000")
    )
    .catch ((err)=>console.log(err))

