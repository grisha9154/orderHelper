const TGBot = require('./telegramBot');

module.exports = (token) => {
    TGBot.initBot(token);
}