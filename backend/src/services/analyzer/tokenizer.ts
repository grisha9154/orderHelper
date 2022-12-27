import { costUnitRegex, weightUnitRegex } from "../../utils";
import { Token } from "./token";
import { TokenNames, TokenWords } from "./tokens-name";

class Tokenizer {
  private tokenizers = [
    this._commandAddToken,
    this._commandCalcCostToken,
    this._commandRreadToken,
    this._commandUpdateToken,
    this._commandRemoveToken,

    this._weightToken,
    this._costToken,
    this._orderToken,
    this._profitToken,
    this._costGoodsToken,
    this._dateRangeToken,
    this._goodOrder,

    this._separatorToken,

    this._textToken,
  ];

  public createToken(words: string[]): Token[] {
    const tokens = words.map((word) => {
      for (const func of this.tokenizers) {
        const token = func(word);
        if (token) {
          return token;
        }
      }
      const errorMessage = `Слово не валидно: ${word}`;
      console.log(errorMessage);

      throw new Error(errorMessage);
    });
    this.extendsWithEndSeparator(tokens);
    return tokens;
  }

  private extendsWithEndSeparator(tokens: Token[]): void {
    if (tokens[tokens.length - 1].type === TokenNames.separator){
      return;
    }
    tokens.push(new Token(TokenNames.separator, TokenWords.separator));
  }

  _commandAddToken(text: string) {
    if (text === TokenWords.command_add) {
      return new Token(TokenNames.command_add, text);
    }
  }

  _commandRreadToken(text: string) {
    if (text == TokenWords.command_read) {
      return new Token(TokenNames.command_read, text);
    }
  }

  _commandUpdateToken(text: string) {
    if (text == TokenWords.command_update) {
      return new Token(TokenNames.command_update, text);
    }
  }

  _commandCalcCostToken(text: string) {
    if (text == TokenWords.command_calc) {
      return new Token(TokenNames.command_calc, text);
    }
  }

  _commandRemoveToken(text: string) {
    if (text === TokenWords.command_delete) {
      return new Token(TokenNames.command_remove, text);
    }
  }

  _weightToken(text: string) {
    if (weightUnitRegex.test(text)) {
      return new Token(TokenNames.param_weight, text);
    }
  }

  _costToken(text: string) {
    if (costUnitRegex.test(text)) {
      return new Token(TokenNames.param_cost, text);
    }
  }

  _orderToken(text: string) {
    if (text == TokenWords.entity_order) {
      return new Token(TokenNames.entity_order, text);
    }
  }

  _profitToken(text: string) {
    if (text === TokenWords.entity_free_mony) {
      return new Token(TokenNames.entity_profit, text);
    }
  }

  _goodOrder(text: string) {
    if (text === TokenWords.entity_goodOrder) {
      return new Token(TokenNames.entity_goodOrder, text);
    }
  }

  _costGoodsToken(text: string) {
    if (text == TokenWords.entity_costGoods) {
      return new Token(TokenNames.entity_costGoods, text);
    }
  }

  _dateRangeToken(text: string) {
    const hasDatate = new RegExp('\\d\\d(.|,)\\d\\d(.|,)\\d\\d\\d\\d').test(text);
    if (hasDatate) {
      return new Token(TokenNames.param_date_range, text);
    }
  }

  _textToken(text: string) {
    if (/[а-яА-Я]*/.test(text)) {
      return new Token(TokenNames.param_text, text);
    }
  }

  _separatorToken(text: string) {
    if (text === TokenWords.separator){
      return new Token(TokenNames.separator, text);
    }

  }
}

export default new Tokenizer();
