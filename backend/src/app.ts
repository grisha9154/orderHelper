import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import {
  tgRouter,
  uploadDataRouter,
  formTrackerRouter,
  authRouter,
  categoryRouter,
  productRouter,
  permissionRouter,
  expenseCategoryRouter,
  expenseRouter,
} from "./api";
import { connection } from "./models/db-connection";
import cors from "cors";

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

permissionRouter(app);
app.post("/tgbot", tgRouter);
authRouter(app);
categoryRouter(app);
productRouter(app);
expenseCategoryRouter(app);
expenseRouter(app);

app.post("/upload", uploadDataRouter);
app.post("/form-tracker", formTrackerRouter);
app.use(express.static("public"));

connection.init().then(() => {
  app.listen(port, () => {
    console.log(`Start listen port: ${port}`);
  });
});
