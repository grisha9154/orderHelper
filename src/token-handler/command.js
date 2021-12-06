class Command {
    constructor(name, entity, params) {
        this.name = name.replace('command_', '');
        this.entity = entity;
        this.params = params;
    }
}

module.exports = Command;
