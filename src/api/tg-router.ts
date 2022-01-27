import { RequestHandler } from "express";

export const tgRouter: RequestHandler = (req, res) => {
  res.send('Worked');
};
