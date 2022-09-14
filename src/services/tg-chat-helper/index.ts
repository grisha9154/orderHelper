import { TgChat } from "../../models/user";

export const getChats = () => {
    return TgChat.findAll();
}

export const setChat = async (chatId: string, name: string) => {
    const chat = await TgChat.findOne({ where: {
        chatId,
      }});
    if (chat) {
        return;
    }

    return TgChat.create({chatId, name});
}