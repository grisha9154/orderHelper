const tokenoizer = require('./tokenizer');

class Analyzer {
    readLine(text) {
        const normalizeText = this._normalize(text);
        const words = normalizeText.split(' ');
        return tokenoizer.createToken(words);
    }

    _normalize(text) {
        return text.toLowerCase().replace(/\n/g, ' ');
    }
}

module.exports = new Analyzer();