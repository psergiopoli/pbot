export function EnvString(envProperty: string, defaultValue: string) {
    return (target: any, key: string): any => {
        target[key] = (): string => process.env[envProperty] || defaultValue;
    };
}


export class Env {
    @EnvString('DISCORD_TOKEN', 'token')
    public static discordToken: () => string;

    @EnvString('INSTA_USER', 'instagram-id')
    public static instagramLogin: () => string;

    @EnvString('INSTA_PASS', 'instagram-secret')
    public static instagramPassword: () => string;

    @EnvString('GOOGLE_KEY', 'google-key')
    public static googleKey: () => string;

    @EnvString('GOOGLE_CSE', 'google-cse')
    public static googleCSE: () => string;
}