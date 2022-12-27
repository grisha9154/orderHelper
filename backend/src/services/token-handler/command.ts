import { Token } from "../analyzer/token";

export class Command<TParams> {
    public name: string;
    public entity: Token;
    public params: TParams;

    constructor(name: string, entity: Token, params: TParams) {
        this.name = name.replace('command_', '');
        this.entity = entity;
        this.params = params;
    }
}
