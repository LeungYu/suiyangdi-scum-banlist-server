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
exports.ScumBanController = void 0;
const common_1 = require("@nestjs/common");
const scum_ban_1 = require("../../dto/scum-ban");
const scum_ban_service_1 = require("./scum-ban.service");
const scum_ban_remark_service_1 = require("./scum-ban-remark.service");
const response_builder_1 = require("../../common/response-builder");
const morgan_log_1 = require("../../common/morgan-log");
const page_1 = require("../../dto/page");
const page_data_builder_1 = require("../../common/page-data-builder");
const format_page_query_1 = require("../../common/format-page-query");
let ScumBanController = class ScumBanController {
    constructor(scumBanService, scumBanRemarkService) {
        this.scumBanService = scumBanService;
        this.scumBanRemarkService = scumBanRemarkService;
    }
    add(res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resGetScumBanList = yield this.scumBanService.getExistScumBanList({ pageSize: 99999, pageNum: 0 }, { reportSource: body.reportSource, steamId: body.steamId });
                if (resGetScumBanList[0] && resGetScumBanList[0].length) {
                    const existScumBan = resGetScumBanList[0][0];
                    return res.json(response_builder_1.responseBuilder(response_builder_1.ResponseStatusCode.OK, existScumBan));
                }
                const resSaveScumBan = yield this.scumBanService.saveScumBan(body.steamId, body.reportSource, body.reason, body.userName, body.scumId);
                if (resSaveScumBan && resSaveScumBan.id) {
                    return res.json(response_builder_1.responseBuilder(response_builder_1.ResponseStatusCode.OK, resSaveScumBan));
                }
                else {
                    return res.json(response_builder_1.responseBuilder(response_builder_1.ResponseStatusCode.INTERNAL_ERROR, resSaveScumBan, 'Error When Add Ban Info'));
                }
            }
            catch (e) {
                morgan_log_1.logBussiness(e);
                return res.json(response_builder_1.responseBuilder(response_builder_1.ResponseStatusCode.INTERNAL_ERROR, {}, e.toString()));
            }
        });
    }
    update(res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resGetScumBanList = yield this.scumBanService.getScumBanList({ pageSize: 99999, pageNum: 0 }, { reportSource: body.reportSource, steamId: body.steamId });
                if (resGetScumBanList[0] && resGetScumBanList[0].length) {
                    const existScumBan = resGetScumBanList[0][0];
                    const resUpdateScumBan = yield this.scumBanService.updateScumBan(existScumBan.id, body.reason);
                    return res.json(response_builder_1.responseBuilder(response_builder_1.ResponseStatusCode.OK, {}));
                }
                else {
                    return res.json(response_builder_1.responseBuilder(response_builder_1.ResponseStatusCode.INTERNAL_ERROR, {}, 'Target Ban Info Not Exist'));
                }
            }
            catch (e) {
                morgan_log_1.logBussiness(e);
                return res.json(response_builder_1.responseBuilder(response_builder_1.ResponseStatusCode.INTERNAL_ERROR, {}, e.toString()));
            }
        });
    }
    delete(res, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resGetScumBanList = yield this.scumBanService.getScumBanList({ pageSize: 99999, pageNum: 0 }, { reportSource: query.reportSource, steamId: query.steamId });
                if (resGetScumBanList[0] && resGetScumBanList[0].length) {
                    const existScumBan = resGetScumBanList[0][0];
                    const resDeleteScumBan = yield this.scumBanService.deleteScumBan({ id: existScumBan.id });
                    return res.json(response_builder_1.responseBuilder(response_builder_1.ResponseStatusCode.OK, {}));
                }
                else {
                    return res.json(response_builder_1.responseBuilder(response_builder_1.ResponseStatusCode.INTERNAL_ERROR, {}, 'Target Ban Info Not Exist'));
                }
            }
            catch (e) {
                morgan_log_1.logBussiness(e);
                return res.json(response_builder_1.responseBuilder(response_builder_1.ResponseStatusCode.INTERNAL_ERROR, {}, e.toString()));
            }
        });
    }
    listScumBan(res, page, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                page = format_page_query_1.formatPageQuery(page);
                const resGetScumBanList = yield this.scumBanService.getScumBanList(page, {
                    steamId: query.steamId,
                    reportSource: query.reportSource,
                    timestampStart: query.timestampStart,
                    timestampEnd: query.timestampEnd,
                });
                resGetScumBanList[0] = resGetScumBanList[0].map(T => {
                    T.reason = Buffer.from(T.reason).toString('utf8');
                    return T;
                });
                return res.json(response_builder_1.responseBuilder(response_builder_1.ResponseStatusCode.OK, page_data_builder_1.pageDataBuilder(resGetScumBanList, page)));
            }
            catch (e) {
                morgan_log_1.logBussiness(e);
                return res.json(response_builder_1.responseBuilder(response_builder_1.ResponseStatusCode.INTERNAL_ERROR, {}, e.toString()));
            }
        });
    }
    exportAllScumBanSteamId(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resGetScumBanList = yield this.scumBanService.getScumBanList({ pageSize: 999999, pageNum: 0 }, {});
                return res.json(response_builder_1.responseBuilder(response_builder_1.ResponseStatusCode.OK, resGetScumBanList[0]));
            }
            catch (e) {
                morgan_log_1.logBussiness(e);
                return res.json(response_builder_1.responseBuilder(response_builder_1.ResponseStatusCode.INTERNAL_ERROR, {}, e.toString()));
            }
        });
    }
    giveScumBanRemark(res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existScumBan = yield this.scumBanService.getScumBan({
                    id: body.scumBanId,
                });
                if (!existScumBan) {
                    return res.json(response_builder_1.responseBuilder(response_builder_1.ResponseStatusCode.INTERNAL_ERROR, {}, 'Target Ban Info Not Exist'));
                }
                if (existScumBan && existScumBan.reportSource === body.remarkServer) {
                    return res.json(response_builder_1.responseBuilder(response_builder_1.ResponseStatusCode.INTERNAL_ERROR, {}, 'Remark On Your Own Uploaded Info Is Prohibited'));
                }
                const existScumBanRemark = yield this.scumBanRemarkService.getScumBanRemark({
                    scumBanId: body.scumBanId,
                    remarkServer: body.remarkServer,
                });
                if (existScumBanRemark && existScumBanRemark.id) {
                    yield this.scumBanRemarkService.deleteScumBanRemark({ id: existScumBanRemark.id });
                }
                if (body.remark !== undefined) {
                    yield this.scumBanRemarkService.saveScumBanRemark(body.scumBanId, body.remarkServer, body.remark);
                }
                return res.json(response_builder_1.responseBuilder(response_builder_1.ResponseStatusCode.OK, {}));
            }
            catch (e) {
                morgan_log_1.logBussiness(e);
                return res.json(response_builder_1.responseBuilder(response_builder_1.ResponseStatusCode.INTERNAL_ERROR, {}, e.toString()));
            }
        });
    }
};
__decorate([
    common_1.Post('/addScumBan'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, scum_ban_1.AddScumBanDto]),
    __metadata("design:returntype", Promise)
], ScumBanController.prototype, "add", null);
__decorate([
    common_1.Put('/updateScumBan'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, scum_ban_1.UpdateScumBanDto]),
    __metadata("design:returntype", Promise)
], ScumBanController.prototype, "update", null);
__decorate([
    common_1.Delete('/deleteScumBan'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, scum_ban_1.DeleteScumBanDto]),
    __metadata("design:returntype", Promise)
], ScumBanController.prototype, "delete", null);
__decorate([
    common_1.Get('/listScumBan'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __param(2, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, page_1.Page,
        scum_ban_1.ListScumBanDto]),
    __metadata("design:returntype", Promise)
], ScumBanController.prototype, "listScumBan", null);
__decorate([
    common_1.Get('/exportAllScumBanSteamId'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScumBanController.prototype, "exportAllScumBanSteamId", null);
__decorate([
    common_1.Post('/giveScumBanRemark'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, scum_ban_1.GiveScumBanRemarkDto]),
    __metadata("design:returntype", Promise)
], ScumBanController.prototype, "giveScumBanRemark", null);
ScumBanController = __decorate([
    common_1.Controller('/scumBan'),
    __metadata("design:paramtypes", [scum_ban_service_1.ScumBanService,
        scum_ban_remark_service_1.ScumBanRemarkService])
], ScumBanController);
exports.ScumBanController = ScumBanController;
//# sourceMappingURL=scum-ban.controller.js.map