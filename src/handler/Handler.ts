import { Message } from "discord.js";

export abstract class Handler {

    private command: string;

    constructor(command: string, haveArguments: boolean) {
        this.command = `${command}${haveArguments ? ' ' : ''}`;
    }

    validate(msg: Message): boolean {
        return msg.content.startsWith(this.command)
    }

    abstract handler(msg: Message);
}