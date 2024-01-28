import express from "express"

const app=express();

app.use(express.json());

import userRouter from "./routes/user.routes.js";


// routes declaration
app.use("/api",userRouter)

export {app}