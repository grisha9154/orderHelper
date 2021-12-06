const initTgBot = require('./src/tg-bot/inti-tg-bot');
const commandHandler = require('./src/commands-helper');

const main = () => {
    commandHandler.registrateCommands('initTgBot', initTgBot);
    commands = process.argv.slice(2);
    commandHandler.handleArgs(commands);
    process.stdin.resume();
}

main();
