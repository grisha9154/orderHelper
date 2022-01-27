import Tokenizer from "./tokenizer";

class Analyzer {
    public readLine(text: string) {
        const normalizeText = this.normalize(text);
        const words = normalizeText.split(' ');
        return Tokenizer.createToken(words);
    }

    public normalize(text: string): string {
        return text.toLowerCase().replace(/\n/g, ' ');
    }
}

export default new Analyzer();