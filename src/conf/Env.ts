export function EnvString(envProperty: string, defaultValue: string) {
    return (target: any, key: string): any => {
        target[key] = (): string => process.env[envProperty] || defaultValue;
    };
}


export class Env {
    @EnvString('DISCORD_TOKEN', 'token')
    public static discordToken: () => string;
}