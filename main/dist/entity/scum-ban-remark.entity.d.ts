export declare enum Remark {
    ARGEE = 0,
    DISARGEE = 1
}
export declare class ScumBanRemark {
    constructor(scumBanId: string, remarkServer: string, remark: Remark);
    id: string;
    scumBanId: string;
    remarkServer: string;
    remark: Remark;
    createdTimeStamp: string;
}
