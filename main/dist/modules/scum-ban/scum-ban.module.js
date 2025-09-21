"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScumBanModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const scum_ban_service_1 = require("./scum-ban.service");
const scum_ban_entity_1 = require("../../entity/scum-ban.entity");
const scum_ban_controller_1 = require("./scum-ban.controller");
const scum_ban_remark_entity_1 = require("../../entity/scum-ban-remark.entity");
const scum_ban_remark_service_1 = require("./scum-ban-remark.service");
let ScumBanModule = class ScumBanModule {
};
ScumBanModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([scum_ban_entity_1.ScumBan, scum_ban_remark_entity_1.ScumBanRemark])],
        providers: [scum_ban_service_1.ScumBanService, scum_ban_remark_service_1.ScumBanRemarkService],
        controllers: [scum_ban_controller_1.ScumBanController],
    })
], ScumBanModule);
exports.ScumBanModule = ScumBanModule;
//# sourceMappingURL=scum-ban.module.js.map