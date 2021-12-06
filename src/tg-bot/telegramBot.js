const TelegramBot = require('node-telegram-bot-api');
const Analyzer = require('../analyzer');
const tokenHandler = require('../token-handler');

class TGBot {
    static initBot(token) {
        if(!this._bot) {
            this._bot = new TelegramBot(token, {polling: true});
            this._bot.on('message', (msg) => {
                console.log(msg.text);
                const tokens = Analyzer.readLine(msg.text);
                const answer = tokenHandler.handle(tokens);
                this._bot.sendMessage(msg.chat.id, answer);
                console.log(answer);
            });
        }
    }
}

module.exports = TGBot;
