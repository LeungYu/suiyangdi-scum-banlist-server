import { Remark, ScumBanRemark } from '../../entity/scum-ban-remark.entity';
import { DeleteResult, Repository } from 'typeorm';
export declare class ScumBanRemarkService {
    private readonly scumBanRemarkRepository;
    constructor(scumBanRemarkRepository: Repository<ScumBanRemark>);
    getScumBanRemark(data: {
        scumBanId: string;
        remarkServer: string;
    }): Promise<any>;
    saveScumBanRemark(scumBanId: string, remarkServer: string, remark: Remark): Promise<ScumBanRemark>;
    deleteScumBanRemark(data: {
        [props: string]: any;
    }): Promise<DeleteResult>;
}
