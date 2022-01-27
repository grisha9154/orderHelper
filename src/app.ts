import express from "express";
import { tgRouter } from "./api";

const app = express();
const port = process.env.PORT || 5000;

app.get("/tgbot", tgRouter);

app.listen(port, () => {
  console.log(`Start listen port: ${port}`);
});
