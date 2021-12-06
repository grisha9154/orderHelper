const Token = require('./token');
const Utils = require('../utils');
const TokenNames = require('./tokens-name');

class Tokenizer {
    _tokenizers = [
        this._commandAddToken,
        this._commandCalcCostToken,
        this._commandRreadToken,
        this._weightToken,
        this._costToken,
        this._orderToken,
        this._costGoodsToken,
        this._textToken,
    ];

    createToken(words) {
        return words.map(word => {
            for(const func of this._tokenizers){
                const token = func(word);
                if(token){
                    return token;
                }
            }
            console.log(`Incorect word: ${word}`);
        });
    }

    _commandAddToken(text) {
        if(text == 'добавь') {
            return new Token(TokenNames.command_add, text);
        }
    }

    _commandRreadToken(text) {
        if(text == 'покажи') {
            return new Token(TokenNames.command_read, text);
        }
    }

    _weightToken(text) {
        if(Utils.weightRegex.test(text)) {
            return new Token(TokenNames.param_weight, text);
        }
    }

    _costToken(text) {
        if(Utils.costRegex.test(text)) {
            return new Token(TokenNames.param_cost, text);
        }
    }

    _textToken(text) {
        if(/[а-яА-Я]*/.test(text)) {
            return new Token(TokenNames.param_text, text);
        }
    }

    _orderToken(text) {
        if(text == 'заказ') {
            return new Token(TokenNames.entity_order, text);
        }
    }

    _costGoodsToken(text) {
        if(text == 'себестоимость') {
            return new Token(TokenNames.entity_costGoods, text);
        }
    }

    _commandCalcCostToken(text) {
        if(text == 'посчитай') {
            return new Token(TokenNames.command_calc, text);
        }
    }
}

module.exports = new Tokenizer();