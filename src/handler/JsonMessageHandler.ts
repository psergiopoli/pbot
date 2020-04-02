import { Handler } from "./Handler";
import { Message } from "discord.js";
import * as data from "./../resources/json/messages.json";

export class JsonMessageHandler implements Handler {
    handler(msg: Message) {
        if (msg.content === '!message') {
            msg.reply(data[0].message);
        }
    }
}