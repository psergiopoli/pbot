import { Handler } from "./Handler";
import { Message } from "discord.js";
import { Logger } from "../conf/Logger";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class ImageSearchHandler extends Handler {

    private NUMBER_OF_RESULTS = 5;

    private axiosConfig = {
        baseURL: 'https://api.qwant.com/api/',
        timeout: 5000,
        headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'}
    };

    private api: AxiosInstance;

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
        this.api = axios.create(this.axiosConfig);
    }

    async handler(msg: Message) {
        if (!this.validate(msg)) return;

        const search = msg.content.substring(5);

        try {
            
            const mediaUrl = await this.getImage(search);

            msg.channel.send(this.shuffleAndPick(this.successMessages), {
                files: [mediaUrl]
            });
        } catch(err) {
            Logger.error(err, "Error on google search");
            msg.channel.send(`Deu algum xabu :warning: :warning: :warning:, chama o ADM!!!!`);
        }

    }

    private async getImage(search: String) {
        const response = await this.api.get("/search/images", {
            params: {
                'count': this.NUMBER_OF_RESULTS,
                'q': search,
                't': 'images',
                'safesearch': 0,
                'locale': 'pt_BR',
                'uiv': 4
            }
        });

        return this.shuffleAndPick(response.data.data.result.items).media;
    }

    private shuffleAndPick(array) {
        array.sort(() => Math.random() - 0.5);
        return array[0];
    }
}
