import { TgChat } from "../../models/user";

export const getChats = () => {
    return TgChat.findAll();
}

export const setChat = async (chatId: string, name: string) => {
    const chats = await TgChat.findAll({ where: {
        chatId: chatId.toString(),
      }});
    if (chats.length) {
        return;
    }

    return TgChat.create({chatId, name});
}