import { RequestHandler } from "express";
import { messageService } from "../services/message-handler";
import { TgBot } from "../utils/tg-bot";
import { setChat } from "../services/tg-chat-helper";

export const tgRouter: RequestHandler = async (req, res) => {
  const { chat, text } = req.body.message;
  try {
    await setChat(chat.id, chat.username);
    const answer = await messageService.handelMessage(text);
    await TgBot.sendMessage(chat.id, answer);
    console.log('Answer: ', answer);
  } catch (error) {
    console.error(error);
  }

  res.status(200).send({});
};
