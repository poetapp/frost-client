import { Method, Network } from './utils/utils';
export interface Configuration {
    readonly host: string;
    readonly email?: string;
    readonly password?: string;
    readonly timeout?: number;
}
export interface ClaimAttributes {
    readonly [key: string]: string;
}
export interface WorkAttributes extends ClaimAttributes {
    readonly name: string;
    readonly datePublished: string;
    readonly dateCreated: string;
    readonly author: string;
    readonly tags?: string;
    readonly content: string;
}
export declare const getOptions: (method: Method, headers?: {}, body?: object) => RequestInit;
export declare class Frost {
    private readonly email;
    private readonly password;
    private readonly host;
    private readonly timeout;
    constructor(config: Configuration);
    timeoutPromise(): Promise<Response>;
    create(email?: string, password?: string): Promise<{
        readonly token: string;
    }>;
    login(email?: string, password?: string): Promise<{
        readonly token: string;
    }>;
    sendEmailVerifyAccount(token: string): Promise<string>;
    verifyAccount(token: string): Promise<{
        readonly token: string;
    }>;
    sendEmailForgotPassword(email?: string): Promise<string>;
    changePassword(token: string, password: string, oldPassword: string): Promise<string>;
    changePasswordWithToken(token: string, password: string): Promise<{
        readonly token: string;
    }>;
    createWork(token: string, work: WorkAttributes): Promise<{
        readonly workId: string;
    }>;
    getWork(token: string, workId: string): Promise<WorkAttributes>;
    getWorks(token: string): Promise<ReadonlyArray<WorkAttributes>>;
    getApiTokens(token: string): Promise<{
        readonly apiTokens: ReadonlyArray<string>;
    }>;
    removeApiToken(token: string, tokenId: string): Promise<string>;
    createApiToken(token: string, network?: Network): Promise<{
        readonly apiToken: string;
    }>;
    getProfile(token: string): Promise<{
        readonly createdAt: number;
        readonly verified: boolean;
    }>;
}
