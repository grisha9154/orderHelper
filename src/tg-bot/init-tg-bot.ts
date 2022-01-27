import { TGBot } from "./telegramBot";


export const initTgBot = (token: string) => {
    TGBot.initBot(token);
}
