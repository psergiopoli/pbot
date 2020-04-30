import { Handler } from "./Handler";
import { Message } from "discord.js";
import { Env } from "../conf/Env";
import { IgApiClient, UserRepositorySearchResponseUsersItem, UserRepositoryInfoResponseUser } from 'instagram-private-api';
import { Logger } from "../conf/Logger";

export class InstagramHandler extends Handler {
    private instagramClient: IgApiClient;

    constructor(command: string) {
        super(command, false);
        this.instagramClient = new IgApiClient();
        this.login();
    }

    private login() {
        // if (this.instagramClient) return;

        const login = Env.instagramLogin();
        const password = Env.instagramPassword();

        this.instagramClient.state.generateDevice(login);        
        this.instagramClient.account.login(login, password).then((res) => {
            Logger.log(`Instagram logged as: ${res.full_name}`);
        });
    }

    async handler(msg: Message) {
        if (!this.validate(msg)) return;

        const profile = msg.content.substring(7);

        try {
            const user: UserRepositorySearchResponseUsersItem = await this.instagramClient.user.searchExact(profile);
            const fullUser: UserRepositoryInfoResponseUser  = await this.instagramClient.user.info(user.pk);

            if (user.is_private) {
                msg.channel.send(`Perfil privado :x: :x: :laughing: :stuck_out_tongue: :x: :x: , toma só a fotinha de perfil pra sentir o gostinho.`, {
                    files: [
                        fullUser.hd_profile_pic_url_info.url
                    ]
                });
            }
    
            if (!user.is_private) {
                msg.channel.send(`Perfil PUBLICO :dancer: :dancer: , foto do perfil.`, {
                    files: [
                        fullUser.hd_profile_pic_url_info.url
                    ]
                });
            }
        } catch(err) {
            Logger.error(err, "erro comunicação com instagram");
            msg.channel.send(`Deu algum xabu :warning: :warning: :warning: , perfil nao existe ou comunicação com instagram esta fora do ar chama o ADM!!!!`);
        }
    }
}
