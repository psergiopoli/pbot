import { Handler } from "./Handler";
import { Message, MessageAttachment } from "discord.js";

export class FileHandler extends Handler {

    constructor(command: string) {
        super(command, false)
    }

    handler(msg: Message) {
        if (!this.validate(msg)) return;
        
        const attachment = new MessageAttachment('https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/01/1452785857main.png');
        msg.channel.send(attachment);
        
    }
}