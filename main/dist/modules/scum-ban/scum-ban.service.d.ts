import { ScumBan } from '../../entity/scum-ban.entity';
import { ScumBanRemark } from '../../entity/scum-ban-remark.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Page } from '../../dto/page';
export declare class ScumBanService {
    private readonly scumBanRepository;
    private readonly scumBanRemarkRepository;
    constructor(scumBanRepository: Repository<ScumBan>, scumBanRemarkRepository: Repository<ScumBanRemark>);
    saveScumBan(steamId: string, reportSource: string, reason: string, userName?: string, scumId?: string): Promise<ScumBan>;
    updateScumBan(id: string, reason: string): Promise<any>;
    getExistScumBanList(page: Page, data?: {
        reportSource?: string;
        steamId?: string;
        timestampStart?: string;
        timestampEnd?: string;
    }): Promise<any>;
    getScumBanList(page: Page, data?: {
        reportSource?: string;
        steamId?: string;
        timestampStart?: string;
        timestampEnd?: string;
    }): Promise<any>;
    getScumBan(data: {
        id: string;
    }): Promise<any>;
    deleteScumBan(data: {
        [props: string]: any;
    }): Promise<DeleteResult>;
}
