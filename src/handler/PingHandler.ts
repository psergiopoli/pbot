import { Handler } from "./Handler";
import { Message } from "discord.js";

export class PingHandler implements Handler {
    handler(msg: Message) {
        if (msg.content === '!ping') {
            msg.reply('pong');
        }
    }
}