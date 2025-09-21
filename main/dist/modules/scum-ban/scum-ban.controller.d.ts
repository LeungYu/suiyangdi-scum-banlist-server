import { Response } from 'express';
import { AddScumBanDto, UpdateScumBanDto, DeleteScumBanDto, ListScumBanDto, GiveScumBanRemarkDto } from '../../dto/scum-ban';
import { ScumBanService } from './scum-ban.service';
import { ScumBanRemarkService } from './scum-ban-remark.service';
import { Page } from '../../dto/page';
export declare class ScumBanController {
    private readonly scumBanService;
    private readonly scumBanRemarkService;
    constructor(scumBanService: ScumBanService, scumBanRemarkService: ScumBanRemarkService);
    add(res: Response, body: AddScumBanDto): Promise<Response<any, Record<string, any>>>;
    update(res: Response, body: UpdateScumBanDto): Promise<Response<any, Record<string, any>>>;
    delete(res: Response, query: DeleteScumBanDto): Promise<Response<any, Record<string, any>>>;
    listScumBan(res: Response, page: Page, query: ListScumBanDto): Promise<Response<any, Record<string, any>>>;
    exportAllScumBanSteamId(res: Response): Promise<Response<any, Record<string, any>>>;
    giveScumBanRemark(res: Response, body: GiveScumBanRemarkDto): Promise<Response<any, Record<string, any>>>;
}
