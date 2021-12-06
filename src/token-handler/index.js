const CommandExecuter = require('./comand-executer');
const Command = require('./command');
const TokenNames = require('../analyzer/tokens-name');

class TokenHandler {
    _handlers = {
        [TokenNames.command_add]: this._add.bind(this),
        [TokenNames.command_calc]: this._calc.bind(this),
    };
    
    handle(tokens) {
        const token = tokens.shift();
        const handler = this._handlers[token.type];
        if(!handler) {
            console.log(`Invalid command name: ${token.type}`);
            throw Error(`Invalid command name: ${token.type}`);
        }
        const answer = handler(tokens);
        return answer;
    }

    _add(tokens) {
        const entity = tokens.shift();
        const params = this._getParams(tokens);
        const command = new Command('add', entity, params);
        return new CommandExecuter().exec(command);
    }

    _calc(tokens) {
        const entity = tokens.shift();
        const params = this._getParams(tokens);
        const command = new Command('calc', entity, params);
        return new CommandExecuter().exec(command);
    }

    _getParams(tokens) {
        const params = [];
        let param = {
            name: '',
            cost: '',
            weight: '',
        };
        for(const token of tokens) {
            switch(token.type) {
                case TokenNames.param_text: {
                    if(param.name === ''){
                        param.name = token.text;
                    }
                    else {
                        param.name += ` ${token.text}`;
                    }
                    break;
                }
                case TokenNames.param_weight: {
                    param.weight = token.text;
                    break;
                }
                case TokenNames.param_cost: {
                    param.cost = token.text;
                    params.push(param);
                    param = {
                        name: '',
                        cost: '',
                        weight: '',
                    };
                    break;
                }
                default:{
                }
            }
        }

        return params;
    }
}

module.exports = new TokenHandler();
