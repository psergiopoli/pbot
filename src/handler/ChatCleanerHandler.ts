import { Handler } from "./Handler";
import { Message } from "discord.js";

export class ChatCleanerHandler extends Handler {
    constructor(command: string) {
        super(command, false)
    }

    async handler(msg: Message) {
        if (!this.validate(msg)) return;

        let allMessages = await msg.channel.messages.fetch();
        msg.channel.bulkDelete(allMessages);
    }
}
