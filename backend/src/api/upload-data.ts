import { RequestHandler } from "express";
import { uploadData } from "../services/upload-data";

export const uploadDataRouter: RequestHandler = async (req, res) => {
  const { cost, order } = req.body;
  try {
    await uploadData(cost, order);
  } catch (error) {
    console.error(error);
  }

  res.status(200).send({});
};
