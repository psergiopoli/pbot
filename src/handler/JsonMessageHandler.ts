import { Handler } from "./Handler";
import { Message } from "discord.js";
import * as data from "./../resources/json/messages.json";

export class JsonMessageHandler extends Handler {

    constructor(command: string) {
        super(command, false)
    }

    handler(msg: Message) {
        if (!this.validate(msg)) return;
    
        msg.reply(data[0].message);
    }
}