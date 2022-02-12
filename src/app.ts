import express from "express";
import bodyParser from "body-parser";
import { tgRouter } from "./api";
import { connection } from "./models/db-connection";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.post("/tgbot", tgRouter);

connection.init().then(() => {
  app.listen(port, () => {
    console.log(`Start listen port: ${port}`);
  });
})

