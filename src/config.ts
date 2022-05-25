export interface IConfig {
    port: number;
    dbHost: string,
    dbUsername: string,
    dbPassword: string,
    dbSchema: string,
}

export const config: IConfig  = {
    port: 3000,
    dbHost: "localhost",
    dbUsername: "root",
    dbPassword: "root",
    dbSchema: "bloggingapp"
}