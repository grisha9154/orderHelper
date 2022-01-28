import { RequestHandler } from "express";

export const tgRouter: RequestHandler = (req, res) => {
  res.send('Люба ты самая красивая. Я тебя очень люблю');
};
