import express from "express";
import bodyParser from "body-parser";
import {router as user} from "./api/user";
import cors from "cors";
export const app = express();
console.log("asdas");
app.use(bodyParser.text());
app.use(bodyParser.json());


app.use(
    cors({
      origin: "*",
    })
  );
app.use("/", user)