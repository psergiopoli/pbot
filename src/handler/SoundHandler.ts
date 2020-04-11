import { Handler } from "./Handler";
import { Message, VoiceChannel, VoiceConnection } from "discord.js";
import { Logger } from "../conf/Logger";

export class SoundHandler extends Handler {
    constructor(command: string) {
        super(command, false)
    }

    handler(msg: Message) {
        if (!this.validate(msg)) return;
        
        const voiceChannel: VoiceChannel = msg.member.voice.channel;

        if (!voiceChannel) {
            Logger.log("User is not on a voice channel")
            return;
        }

        voiceChannel.join().then(async (vc: VoiceConnection) => {
            const dispatcher = vc.play('./sound/bless.wav', { volume: 1 });
            dispatcher.on("finish", () => voiceChannel.leave());
        }).catch(error => {
            Logger.error(error, "Error message");
            voiceChannel.leave();
        });
    }
}