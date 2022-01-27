class CommandsHelper {
    private commands: Record<string, (value: string) => void> = {};

    public registrateCommands(name: string, handler: (value: string) => void) {
        if (this.commands[name]) {
            throw Error('Duplicate Name');
        }
        this.commands[name] = handler;
    }

    handleArgs(args: string[]) {
        args.forEach(element => {
            const [name, value] = element.split('=');
            const commandHandler = this.commands[name];
            if(!commandHandler){
                console.log(`Inncorect command name: ${name}`);
            }
            commandHandler(value);
        });
    }
}

export default new CommandsHelper();
