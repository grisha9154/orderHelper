import express from "express";
import bodyParser from "body-parser";
import { tgRouter } from "./api";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get("/tgbot", tgRouter);

app.listen(port, () => {
  console.log(`Start listen port: ${port}`);
});
