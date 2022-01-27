import { costUnitRegex, weightUnitRegex } from "../utils";
import { Token } from "./token";
import { TokenNames } from "./tokens-name";

class Tokenizer {
    private tokenizers = [
        this._commandAddToken,
        this._commandCalcCostToken,
        this._commandRreadToken,
        this._commandUpdateToken,
        this._weightToken,
        this._costToken,
        this._orderToken,
        this._profitToken,
        this._costGoodsToken,
        this._textToken,
    ];

    public createToken(words: string[]) {
        return words.map(word => {
            for(const func of this.tokenizers){
                const token = func(word);
                if(token){
                    return token;
                }
            }
            console.log(`Incorect word: ${word}`);
        });
    }

    _commandAddToken(text: string) {
        if(text == 'добавь') {
            return new Token(TokenNames.command_add, text);
        }
    }

    _commandRreadToken(text: string) {
        if(text == 'покажи') {
            return new Token(TokenNames.command_read, text);
        }
    }

    _commandUpdateToken(text: string){
        if(text == 'обнови') {
            return new Token(TokenNames.command_update, text);
        }
    }

    _weightToken(text: string) {
        if(weightUnitRegex.test(text)) {
            return new Token(TokenNames.param_weight, text);
        }
    }

    _costToken(text: string) {
        if(costUnitRegex.test(text)) {
            return new Token(TokenNames.param_cost, text);
        }
    }

    _textToken(text: string) {
        if(/[а-яА-Я]*/.test(text)) {
            return new Token(TokenNames.param_text, text);
        }
    }

    _orderToken(text: string) {
        if(text == 'заказ') {
            return new Token(TokenNames.entity_order, text);
        }
    }

    _profitToken(text: string) {
        if(text === 'прибыль') {
            return new Token(TokenNames.entity_profit, text);
        }
    }

    _costGoodsToken(text: string) {
        if(text == 'себестоимость') {
            return new Token(TokenNames.entity_costGoods, text);
        }
    }

    _commandCalcCostToken(text: string) {
        if(text == 'посчитай') {
            return new Token(TokenNames.command_calc, text);
        }
    }
}

export default new Tokenizer();