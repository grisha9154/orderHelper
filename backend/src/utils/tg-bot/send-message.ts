import axios from "axios";
import { Constans } from "./constants";

export const sendMessage = (chatId: string, text: string) => {
    const token = process.env.tg_bot_token;
    return axios.post(`${Constans.url}${token}/sendMessage`, {chat_id: chatId, text});
}