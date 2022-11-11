const express = require ("express");
const mongoose = require ("mongoose");
const blogRouter = require ("./routes/blog-routes");
const router = require ("./routes/user-routes");
const cors = require ("cors");
const port = process.env.PORT || 7000

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/user",router);

app.use("/api/blog",blogRouter);

mongoose
    .connect(
        "mongodb+srv://jrchuks:THISISarea51@verbose.t3zmev3.mongodb.net/Verbose?retryWrites=true&w=majority"
    )
    .then(()=>app.listen(port, console.log("Server running on port", port)))
    .then(()=>
        console.log("Connected to database and listening to localhost 7000")
    )
    .catch ((err)=>console.log(err))

