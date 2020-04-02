import { Handler } from "./Handler";
import { Message } from "discord.js";

export class PingHandler extends Handler {
    constructor(command: string) {
        super(command, false)
    }

    handler(msg: Message) {
        if (!this.validate(msg)) return;
        
        msg.reply('pong');
    }
}