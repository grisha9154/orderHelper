import { Token } from "../analyzer/token";
import { TokenNames } from "../analyzer/tokens-name";
import { Command } from "./command";
import CommandExecuter from "./comand-executer";
import { ICalcProfitParam } from "./calc-profit-command-executor";

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
    const params = this.isOrderEntity(entity)
      ? this.getParams(tokens)
      : this.getCalcProfitParams(tokens);
    const command = new Command("calc", entity, params);

    return CommandExecuter.exec(command);
  }

  private isOrderEntity(token: Token): boolean {
    return token.type === TokenNames.entity_order;
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
    const params = this.getDeleteParams(tokens);
    const command = new Command("remove", entity, params);

    return CommandExecuter.exec(command);
  }

  private getDeleteParams(tokens: Token[]): Array<{ name: string }> {
    const result: Array<{ name: string }> = [];
    let name = '';
    tokens.forEach(t => {
      if (t.type === TokenNames.separator) {
        if (name !== '') {
          result.push({ name });
          name = '';
        }
        
        return;
      }
      name += name 
        ? ` ${t.text}`
        : t.text;

    })

    return result;
  }

  private getCalcProfitParams(tokens: Token[]) {
    const dateRange = tokens.shift();
    const param: ICalcProfitParam = {
      from: undefined,
      to: undefined,
    };

    if (dateRange?.type === TokenNames.param_date_range) {
      const [fd, fm, fy] = dateRange.text.slice(0,10).split(/[.,]/g);
      if (fd && fm && fy) {
        param.from = new Date(Number(fy), Number(fm), Number(fd));
      }
      const [td, tm, ty] = dateRange.text.slice(11,21).split(/[.,]/g);
      if (td && tm && ty) {
        param.to = new Date(Number(ty), Number(tm), Number(td)); 
      }
    }

    return param;
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
          break;
        }
        case TokenNames.separator: {
          if (param.name && param.cost) {
            params.push(param);
          }
          param = {
            name: "",
            cost: "",
            weight: "",
          };
        }
        default: {
        }
      }
    }
    return params;
  }
}

export default new TokenHandler();
