import { Token } from "../analyzer/token";
import { TokenNames } from "../analyzer/tokens-name";
import { Command } from "./command";
import CommandExecuter from "./comand-executer";

class TokenHandler {
  private handlers: Record<string, (tokens: Token[]) => Promise<string>> = {
    [TokenNames.command_add]: this.add.bind(this),
    [TokenNames.command_calc]: this.clack.bind(this),
    [TokenNames.command_read]: this.read.bind(this),
    [TokenNames.command_update]: this.update.bind(this),
    [TokenNames.command_remove]: this.delete.bind(this),
  };

  public async handle(tokens: Token[]) {
    const token = tokens.shift();
    if (!token) {
      throw new Error(`Пустое сообщение.`);
    }
    const handler = this.handlers[token.type];
    if (!handler) {
      console.log(`Invalid command name: ${token.type}`);
      throw new Error(`Не разобрана команда: ${token.text}`);
    }
    const answer = await handler(tokens);

    return answer;
  }

  private add(tokens: Token[]) {
    const entity = tokens.shift();
    if (!entity) {
      throw new Error(`Не указана сущность для добавления.`);
    }
    const params = this.getParams(tokens);
    const command = new Command("add", entity, params);

    return CommandExecuter.exec(command);
  }

  private clack(tokens: Token[]) {
    const entity = tokens.shift();
    if (!entity) {
      throw new Error("Не указана сущность для посчитай");
    }
    const params = this.getParams(tokens);
    const command = new Command("calc", entity, params);

    return CommandExecuter.exec(command);
  }

  private read(tokens: Token[]) {
    const entity = tokens.shift();
    if (!entity) {
      throw new Error("Не указана сущность для покажи");
    }
    const command = new Command("read", entity, null);

    return CommandExecuter.exec(command);
  }

  private update(tokens: Token[]) {
    const entity = tokens.shift();
    if (!entity) {
      throw new Error("Не указана сущность для обновления");
    }
    const params = this.getParams(tokens);
    const command = new Command("update", entity, params);

    return CommandExecuter.exec(command);
  }

  private delete(tokens: Token[]) {
    const entity = tokens.shift();
    if (!entity) {
      throw new Error("Не указана сущность для удаления");
    }
    const params = tokens.map((t) => ({ name: t.text }));
    const command = new Command("remove", entity, params);

    return CommandExecuter.exec(command);
  }

  private getParams(tokens: Token[]) {
    const params = [];
    let param = {
      name: "",
      cost: "",
      weight: "",
    };
    for (const token of tokens) {
      switch (token.type) {
        case TokenNames.param_text: {
          if (param.name === "") {
            param.name = token.text;
          } else {
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
            name: "",
            cost: "",
            weight: "",
          };
          break;
        }
        default: {
        }
      }
    }
    return params;
  }
}

export default new TokenHandler();
