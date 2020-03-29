import Discord, { MessageAttachment, Message, VoiceChannel, VoiceConnection } from 'discord.js';
import { Env } from './conf/Env';
import { Logger } from './conf/Logger';
import ytdl from 'ytdl-core-discord';

export class DiscordServer {

    client: Discord.Client;

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

        this.client.on('message', (msg: Message) => {
            if (msg.content === 'ping') {
                msg.reply('pong');
            }

            Logger.log(`Message: ${msg.content}`);

            if (msg.content === 'pingMult') {
                msg.channel.send('pong');
            }

            if (msg.content === 'pingFile') {
                const attachment = new MessageAttachment('https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/01/1452785857main.png');
                msg.channel.send(attachment);
            }

            if (msg.content === 'pingYT') { 
                const voiceChannel: VoiceChannel = msg.member.voice.channel;

                if (!voiceChannel) {
                    Logger.log("User is not on a voice channel")
                    return;
                }

                voiceChannel.join().then(async (vc: VoiceConnection) => {
                    //const readable = await ytdl('https://www.youtube.com/watch?v=a8c5wmeOL9o');
                    //const dispatcher = vc.play(readable, { type: 'opus', volume: 10 });
                    const dispatcher = vc.play('./sound/bless.mp3', { volume: 1 });
                    dispatcher.on("finish", () => voiceChannel.leave());
                }).catch(error => {
                    Logger.error(error);
                    voiceChannel.leave();
                });
            }

        });
    }

}
