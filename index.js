import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./src/routes";

const app = express();

app.use(express.json());
app.use(cors({
    origin: "https://client-api-com-front.vercel.app",
    credentials: true,
    methods: 'GET,PUT,PATCH,POST,DELETE,UPDATE'
}));
app.use('/', routes);

const port = process.env.PORT || 3000;

mongoose.connect(
    process.env.DATABASE_URL
).then(() => {
    app.listen(port);
}).catch((e) => console.log(e));