import Tokenizer from "./tokenizer";
import { TokenWords } from "./tokens-name";

class Analyzer {
  public readLine(text: string) {
    const normalizeText = this.normalize(text);
    const words = normalizeText.split(" ");
    return Tokenizer.createToken(words);
  }

  private normalize(text: string): string {
    return text.toLowerCase().replace(/\n/g, ` ${TokenWords.separator} `);
  }
}

export default new Analyzer();
