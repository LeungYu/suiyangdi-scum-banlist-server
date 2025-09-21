"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScumBanService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const scum_ban_entity_1 = require("../../entity/scum-ban.entity");
const scum_ban_remark_entity_1 = require("../../entity/scum-ban-remark.entity");
const typeorm_2 = require("typeorm");
let ScumBanService = class ScumBanService {
    constructor(scumBanRepository, scumBanRemarkRepository) {
        this.scumBanRepository = scumBanRepository;
        this.scumBanRemarkRepository = scumBanRemarkRepository;
    }
    saveScumBan(steamId, reportSource, reason, userName, scumId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.scumBanRepository.save(new scum_ban_entity_1.ScumBan(steamId, reportSource, reason, userName, scumId));
        });
    }
    updateScumBan(id, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = this.scumBanRepository.createQueryBuilder('scumBan')
                .update(scum_ban_entity_1.ScumBan)
                .set({ reason });
            res = res.andWhere('id = :id', { id });
            return yield res.execute();
        });
    }
    getExistScumBanList(page, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.scumBanRepository.createQueryBuilder('scumBan');
            res = res.leftJoinAndMapMany('scumBan.scumBanRemark', scum_ban_remark_entity_1.ScumBanRemark, 'scumBanRemark', 'scumBan.id = scumBanRemark.scumBanId');
            if (data.reportSource) {
                res = res.andWhere('scumBan.reportSource = :reportSource', { reportSource: data.reportSource });
            }
            if (data.steamId) {
                res = res.andWhere('scumBan.steamId = :steamId', { steamId: data.steamId });
            }
            if (data.timestampStart && data.timestampEnd) {
                res = res.andWhere('scumBan.createdTimeStamp >= :timestampStart', { timestampStart: data.timestampStart });
                res = res.andWhere('scumBan.createdTimeStamp <= :timestampEnd', { timestampEnd: data.timestampEnd });
            }
            return yield res
                .orderBy(`scumBan.createdTimeStamp`, 'DESC')
                .skip(page.pageNum)
                .take(page.pageSize)
                .getManyAndCount();
        });
    }
    getScumBanList(page, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.scumBanRepository.createQueryBuilder('scumBan');
            res = res.leftJoinAndMapMany('scumBan.scumBanRemark', scum_ban_remark_entity_1.ScumBanRemark, 'scumBanRemark', 'scumBan.id = scumBanRemark.scumBanId');
            if (data.reportSource) {
                res = res.andWhere('scumBan.reportSource = :reportSource', { reportSource: data.reportSource });
            }
            if (data.steamId) {
                res = res.andWhere('scumBan.steamId = :steamId', { steamId: data.steamId });
            }
            if (data.timestampStart && data.timestampEnd) {
                res = res.andWhere('scumBan.createdTimeStamp >= :timestampStart', { timestampStart: data.timestampStart });
                res = res.andWhere('scumBan.createdTimeStamp <= :timestampEnd', { timestampEnd: data.timestampEnd });
            }
            res = res.andWhere('scumBan.valid = true');
            return yield res
                .orderBy(`scumBan.createdTimeStamp`, 'DESC')
                .skip(page.pageNum)
                .take(page.pageSize)
                .getManyAndCount();
        });
    }
    getScumBan(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.scumBanRepository.createQueryBuilder('scumBan');
            res = res.where('id = :id', { id: data.id });
            res = res.andWhere('valid = true');
            return yield res
                .getOne();
        });
    }
    deleteScumBan(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.scumBanRepository.createQueryBuilder('scumBan')
                .delete()
                .from(scum_ban_entity_1.ScumBan);
            res = res.andWhere('id = :id', { id: data.id });
            return yield res
                .execute();
        });
    }
};
ScumBanService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(scum_ban_entity_1.ScumBan)),
    __param(1, typeorm_1.InjectRepository(scum_ban_remark_entity_1.ScumBanRemark)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ScumBanService);
exports.ScumBanService = ScumBanService;
//# sourceMappingURL=scum-ban.service.js.map