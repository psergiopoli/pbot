import text2wav = require('text2wav')
import txtomp3 = require("text-to-mp3");
import { Handler } from './Handler'
import { VoiceChannel, VoiceConnection, Message } from 'discord.js';
import { Logger } from "../conf/Logger";
import { Readable } from 'stream'



export class VoiceHandler extends Handler {

    constructor(command: string) {
        super(command, true);
    }

    async handler(msg: Message) {
        if (!this.validate(msg)) return;

        const voiceChannel: VoiceChannel = msg.member.voice.channel;

        const message = msg.content.substring(7);

        var options = {
            tl: 'pt-br'
        }

        txtomp3.getMp3(message, options).then(function(binaryStream){
            const readable = new Readable()
            readable._read = () => {}
            readable.push(binaryStream)
            readable.push(null)

            voiceChannel.join().then(async (vc: VoiceConnection) => {
                const dispatcher = vc.play(readable, { volume: 1 });
                dispatcher.on("finish", () => voiceChannel.leave());
            }).catch(error => {
                Logger.error(error, "Error message");
                voiceChannel.leave();
            });
          })
          .catch(function(err){
            Logger.error(err, "Error message")
          })
    }
        

    async handlerOld(msg: Message) {
        if (!this.validate(msg)) return;

        const message = msg.content.substring(7);

        let out = await text2wav(message, {
            voice: "pt",
            wordGap: 50,
            pitch: 80,
            speed: 125
        });

        const voiceChannel: VoiceChannel = msg.member.voice.channel;

        if (!voiceChannel) {
            Logger.log("User is not on a voice channel")
            return;
        }

        const readable = new Readable()
        readable._read = () => {}
        readable.push(out)
        readable.push(null)

        voiceChannel.join().then(async (vc: VoiceConnection) => {
            const dispatcher = vc.play(readable, { volume: 1 });
            dispatcher.on("finish", () => voiceChannel.leave());
        }).catch(error => {
            Logger.error(error, "Error message");
            voiceChannel.leave();
        });
    }
}