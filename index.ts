import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/db/connectDB";
import contactRouter from "./src/routes/contact.routes";
import groupRouter from "./src/routes/group.routes";
import userRouter from "./src/routes/user.routes";

const app:Application = express();

// configure dotenv
dotenv.config({path: "./.env"})

// configure express to read form data
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// configure cors - "cross origin resource sharing"
app.use(cors())

const port:string | undefined | number  = process.env.PORT || 9999;
const dbName:string | undefined = process.env.DB_NAME;
const dbUrl:string | undefined = process.env.MONGODB_URL;

app.get("/", (req:Request, res:Response) => {
    res.status(200);
    res.json({
        message: "Welcome to new express server",
    })
})

// configure the routes
app.use("/contacts", contactRouter);
app.use("/groups", groupRouter);
app.use("/users", userRouter);

if (port) {
    app.listen(Number(port),()=>{
        if (dbName && dbUrl) {
            connectDB(dbName, dbUrl)
        }
        console.log(`Express server is running at ${port}`)
    })
}

