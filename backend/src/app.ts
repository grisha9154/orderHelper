import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { tgRouter, uploadDataRouter, formTrackerRouter, authRouter, categoryRouter } from "./api";
import { connection } from "./models/db-connection";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.post("/tgbot", tgRouter);
authRouter(app);
categoryRouter(app);

app.post("/upload", uploadDataRouter);
app.post("/form-tracker", formTrackerRouter);
app.use(express.static('public'));

connection.init().then(() => {
  app.listen(port, () => {
    console.log(`Start listen port: ${port}`);
  });
});
