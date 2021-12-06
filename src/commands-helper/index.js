class CommandsHelper {
    _commands = {};

    registrateCommands(name, handler) {
        if (this._commands[name]){
            throw Error('Duplicate Name');
        }
        this._commands[name] = handler;
    }

    handleArgs(args) {
        args.forEach(element => {
            const [name, value] = element.split('=');
            const commandHandler = this._commands[name];
            if(!commandHandler){
                console.log(`Inncorect command name: ${name}`);
            }
            commandHandler(value);
        });
    }
}

module.exports = new CommandsHelper();

