import { RequestHandler } from "express";

export const tgRouter: RequestHandler = (req, res) => {
  const body = req.body;

  res.send(body);
};
