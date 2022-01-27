import TelegramBot from "node-telegram-bot-api";
import Analyzer from "../analyzer";
import tokenHandler from "../token-handler";

export class TGBot {
    private static bot: TelegramBot;

    static initBot(token: string) {
        if (!this.bot) {
            this.bot = new TelegramBot(token, { polling: true });
            this.bot.on('message', (msg) => {
                try {
                    console.log(`Input: ${msg.text}`);
                    const tokens = Analyzer.readLine(msg.text);
                    const answer = tokenHandler.handle(tokens);
                    this.bot.sendMessage(msg.chat.id, answer);
                    console.log(`Answer: ${answer}`);
                }
                catch (error) {
                    console.log(error.message);
                    this.bot.sendMessage(msg.chat.id, error);
                }
            });
        }
    }
}
