import { Handler } from "./Handler";
import { Message } from "discord.js";
import { google, customsearch_v1 } from 'googleapis';
import { Env } from "../conf/Env";
import { Logger } from "../conf/Logger";


export class GoogleImageHandler extends Handler {

    private NUMBER_OF_RESULTS = 2;

    private searchEngine: customsearch_v1.Customsearch;
    private googleKey: string;
    private googleCSE: string;

    private successMessages: string[] = [
        'Parece que você teve sorte hoje pequena lula marinha!!',
        'Os deuses olharam para você, toma aqui sua imagem zézinho!!',
        'Parece que voce votou 17 na ultima eleição, sua sorte esta a toda, toma sua imagem!',
        'O Lula ainda esta preso, por isso você teve essa sorte, pega ai!',
        'Olha, hoje voce acordou com o pé esquerdo, mas nao esqueça que o segundo pé a pisar no chão é sempre o direito!',
        'Pedra dura tanto bate até que chega, pega ai sua imagem!'
    ];

    private errorMessages: string[] = [
        'Sua busca não retornou nada pequeno gafanhto lunar!!!!'
    ];

    constructor(command: string) {
        super(command, false)
        
        this.googleKey = Env.googleKey();
        this.googleCSE = Env.googleCSE();

        this.searchEngine = google.customsearch({
            version: "v1"
        });
    }

    async handler(msg: Message) {
        if (!this.validate(msg)) return;

        const search = msg.content.substring(5);

        const params = {
            auth: this.googleKey,
            cx: this.googleCSE,
            q: search,
            searchType: 'image',
            imgSize: 'medium', //icon, small, medium, large, xlarge, xxlarge, and huge. 
            num: this.NUMBER_OF_RESULTS
        };

        try {
            const response = await this.searchEngine.cse.list(params);
            const image = this.shuffleAndPick(response.data.items);
            console.log(image.link);

            msg.channel.send(this.shuffleAndPick(this.successMessages), {
                files: [image.link]
            });
        } catch(err) {
            Logger.error(err, "Error on google search");
            msg.channel.send(`Deu algum xabu :warning: :warning: :warning:, chama o ADM!!!!`);
        }

    }

    private shuffleAndPick(array) {
        array.sort(() => Math.random() - 0.5);
        return array[0];
    }
}
