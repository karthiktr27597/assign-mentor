import express from "express";
import { mentorRouter } from "./Routes/mentor.js";
import { studentRouter } from "./Routes/student.js";
import dotenv from "dotenv";
dotenv.config();

// port
const port = process.env.PORT

// initiating server
const app = express();

// middle ware
app.use(express.json());

// application middleware
app.use("/mentor", mentorRouter)
app.use("/student", studentRouter)


// test
app.get("/", (req, res) => {
    res.send("server working good, please use end point get data")
})

// listen and starting http server in localhost
app.listen(port, console.log(`Server started in local host:${port}`));



