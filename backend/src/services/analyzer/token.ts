export class Token {
    public type: string;
    public text: string;

    constructor(type: string, text: string) {
        this.type = type;
        this.text = text;
    }
}
