import { Handler } from "./Handler";
import { Message, MessageAttachment } from "discord.js";

export class FileHandler implements Handler {
    handler(msg: Message) {
        if (msg.content === '!pingFile') {
            const attachment = new MessageAttachment('https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/01/1452785857main.png');
            msg.channel.send(attachment);
        }
    }
}