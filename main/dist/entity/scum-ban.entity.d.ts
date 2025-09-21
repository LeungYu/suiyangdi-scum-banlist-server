export declare class ScumBan {
    constructor(steamId: string, reportSource: string, reason: string, userName?: string, scumId?: string);
    id: string;
    steamId: string;
    reportSource: string;
    reason: string;
    userName: string;
    scumId: string;
    valid: boolean;
    createdTimeStamp: string;
}
