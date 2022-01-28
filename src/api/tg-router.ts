import axios from "axios";
import { RequestHandler } from "express";

const url = "https://api.telegram.org/bot";
const token = process.env.tg_bot_token;

export const tgRouter: RequestHandler = async (req, res) => {
  const { chat, text } = req.body.message;
  try {
    await axios.post(`${url}${token}/sendMessage`, {
      chat_id: chat.id,
      text,
    })
  } catch (error) {
    console.error(`Error with send answer`);
  }

  res.status(200).send({});
};
