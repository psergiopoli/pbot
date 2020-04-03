import { Handler } from "./Handler";
import { Message, VoiceChannel, VoiceConnection } from "discord.js";
import { Logger } from "../conf/Logger";
import ytdl from 'ytdl-core-discord';

export class YoutubeHandler extends Handler {
    constructor(command: string) {
        super(command, true)
    }

    handler(msg: Message) {
        if (!this.validate(msg)) return;
        
        var url = msg.content.substring(4);
        url = `https://www.youtube.com/watch?v=${url}`; //!yt a8c5wmeOL9o

        const voiceChannel: VoiceChannel = msg.member.voice.channel;

        if (!voiceChannel) {
            Logger.log("User is not on a voice channel")
            return;
        }

        voiceChannel.join().then(async (vc: VoiceConnection) => {
            const readable = await ytdl(url);
            const dispatcher = vc.play(readable, { type: 'opus', volume: 1 });
            dispatcher.on("finish", () => voiceChannel.leave());
        }).catch(error => {
            Logger.error(error);
            voiceChannel.leave();
        });
    }
}