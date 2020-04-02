import { Message } from "discord.js";

export interface Handler {
    handler(msg: Message)
}