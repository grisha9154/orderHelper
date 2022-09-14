import { RequestHandler } from "express";
import * as TgChatService from "../services/tg-chat-helper";
import { TgBot } from "../utils/tg-bot";

export const formTrackerRouter: RequestHandler = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const chats = await TgChatService.getChats();
        chats.forEach(c => {
            TgBot.sendMessage(c.chatId, 'Новый заказ! Проверте гугл форму');
        });
    } catch (error) {
        console.error(error);
    }

    res.status(200).send();
}