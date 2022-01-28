import axios from "axios";
import { RequestHandler } from "express";
import { messageService } from "../services/message-handler";

const url = "https://api.telegram.org/bot";
const token = process.env.tg_bot_token;


export const tgRouter: RequestHandler = async (req, res) => {
  const { chat, text } = req.body.message;
  const sendAswer = (answer: String) => axios.post(`${url}${token}/sendMessage`, {
    chat_id: chat.id,
    answer,
  })
  try {
    const answer = await messageService.handelMessage(text);
    await sendAswer(answer);
  } catch (error) {
    const message = `Error with send`
    console.error(message);
    await sendAswer(message);
  }

  res.status(200).send({});
};
