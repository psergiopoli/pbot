import { Handler } from "./BaseHandler";
import { Message, VoiceChannel, VoiceConnection } from "discord.js";
import { Logger } from "../conf/Logger";

export class SoundHandler implements Handler {
    handler(msg: Message) {
        if (msg.content === '!pingSound') { 
            const voiceChannel: VoiceChannel = msg.member.voice.channel;

            if (!voiceChannel) {
                Logger.log("User is not on a voice channel")
                return;
            }

            voiceChannel.join().then(async (vc: VoiceConnection) => {
                const dispatcher = vc.play('./sound/bless.wav', { volume: 1 });
                dispatcher.on("finish", () => voiceChannel.leave());
            }).catch(error => {
                Logger.error(error);
                voiceChannel.leave();
            });
        }
    }
}