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
exports.ScumBanRemarkService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const scum_ban_remark_entity_1 = require("../../entity/scum-ban-remark.entity");
const typeorm_2 = require("typeorm");
let ScumBanRemarkService = class ScumBanRemarkService {
    constructor(scumBanRemarkRepository) {
        this.scumBanRemarkRepository = scumBanRemarkRepository;
    }
    getScumBanRemark(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.scumBanRemarkRepository.createQueryBuilder('scumBanRemark');
            res = res.where('scumBanId = :scumBanId', { scumBanId: data.scumBanId });
            res = res.where('remarkServer = :remarkServer', { remarkServer: data.remarkServer });
            return yield res
                .getOne();
        });
    }
    saveScumBanRemark(scumBanId, remarkServer, remark) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.scumBanRemarkRepository.save(new scum_ban_remark_entity_1.ScumBanRemark(scumBanId, remarkServer, remark));
        });
    }
    deleteScumBanRemark(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.scumBanRemarkRepository.createQueryBuilder('scumBanRemark')
                .delete()
                .from(scum_ban_remark_entity_1.ScumBanRemark);
            res = res.andWhere('id = :id', { id: data.id });
            return yield res
                .execute();
        });
    }
};
ScumBanRemarkService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(scum_ban_remark_entity_1.ScumBanRemark)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ScumBanRemarkService);
exports.ScumBanRemarkService = ScumBanRemarkService;
//# sourceMappingURL=scum-ban-remark.service.js.map