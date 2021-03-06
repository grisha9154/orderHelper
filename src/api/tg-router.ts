import axios from "axios";
import { RequestHandler } from "express";
import { messageService } from "../services/message-handler";

const url = "https://api.telegram.org/bot";
const token = process.env.tg_bot_token;

export const tgRouter: RequestHandler = async (req, res) => {
  const { chat, text } = req.body.message;
  try {
    const answer = await messageService.handelMessage(text);
    await axios.post(`${url}${token}/sendMessage`, {
      chat_id: chat.id,
      text: answer,
    });
    console.log('Answer: ', answer);
  } catch (error) {
    console.error(error);
  }

  res.status(200).send({});
};
