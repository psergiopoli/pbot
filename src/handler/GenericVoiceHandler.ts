import { Handler } from './Handler'
import { VoiceChannel, VoiceConnection, Message } from 'discord.js';
import { Logger } from "../conf/Logger";
import { Readable } from 'stream'

import googleTTS = require('google-tts-api');
import fetch = require("node-fetch");

//Usage: {command} {locale} {message}
//Example: !mlvoice pt-br Teste 
export class GenericVoiceHandler extends Handler {

    constructor(command: string) {
        super(command, true);
    }

    async handler(msg: Message) {
        if (!this.validate(msg)) return;

        const voiceChannel: VoiceChannel = msg.member.voice.channel;
        const localeMessageRegex = /.+? (.+?) (.+)/
        const [, locale, message] = msg.content.match(localeMessageRegex)
        this.convertAndSend(locale, message, voiceChannel);
    }

    async convertAndSend(locale: String, msg: String, voiceChannel: VoiceChannel) {
        const url = await googleTTS(msg, locale, 1);
        let response = await fetch(url);
        const readable = new Readable()
        readable._read = () => {}
        readable.push(await response.buffer())
        readable.push(null)

        voiceChannel.join().then(async (vc: VoiceConnection) => {
            const dispatcher = vc.play(readable, { volume: 1 });
            dispatcher.on("finish", () => voiceChannel.leave());
        }).catch(error => {
            Logger.error(error, "Error message");
            voiceChannel.leave();
        });
    }

    async sendVoice(locale: String, msg: String, channel: VoiceChannel) {
        this.convertAndSend(locale, msg, channel);
    }
}
