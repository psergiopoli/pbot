import Discord, {Message } from 'discord.js';
import { Env } from './conf/Env';
import { Logger } from './conf/Logger';
import { PingHandler, FileHandler, YoutubeHandler, SoundHandler, JsonMessageHandler, VoiceHandler } from './handler/';

export class DiscordServer {

    client: Discord.Client;
    prefix: string = '!';

    constructor() {
        this.client = new Discord.Client();
        this.setHandlers();
        this.client.login(Env.discordToken());
        Logger.log("Server started with success");
    }    

    setHandlers() {
        this.client.on('ready', () => {
            Logger.log(`Logged in as ${this.client.user?.tag}!`);
        });

        const pingHandler: PingHandler = new PingHandler("!ping");
        const fileHandler: FileHandler = new FileHandler("!file");
        const yotubeHandler: YoutubeHandler = new YoutubeHandler("!yt");
        const soundHandler: SoundHandler = new SoundHandler("!sd");
        const jsonMessageHandler: JsonMessageHandler = new JsonMessageHandler("!msg");
        const voiceHandler: VoiceHandler = new VoiceHandler("!voice");

        this.client.on('message', (msg: Message) => {

            if (!msg.content.startsWith(this.prefix) || msg.author.bot) return
            
            pingHandler.handler(msg);
            fileHandler.handler(msg);
            yotubeHandler.handler(msg);
            soundHandler.handler(msg);
            jsonMessageHandler.handler(msg);
            voiceHandler.handler(msg);

        });
    }

}
