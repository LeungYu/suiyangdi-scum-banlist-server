import { Remark } from "../entity/scum-ban-remark.entity";
export declare class AddScumBanDto {
    steamId: string;
    reportSource: string;
    reason: string;
    userName?: string;
    scumId?: string;
}
export declare class UpdateScumBanDto {
    reportSource: string;
    steamId: string;
    reason: string;
}
export declare class DeleteScumBanDto {
    reportSource: string;
    steamId: string;
}
export declare class ListScumBanDto {
    steamId?: string;
    reportSource?: string;
    timestampStart?: string;
    timestampEnd?: string;
}
export declare class GiveScumBanRemarkDto {
    scumBanId: string;
    remarkServer: string;
    remark?: Remark;
}
