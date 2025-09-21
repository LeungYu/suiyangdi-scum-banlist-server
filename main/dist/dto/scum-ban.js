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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiveScumBanRemarkDto = exports.ListScumBanDto = exports.DeleteScumBanDto = exports.UpdateScumBanDto = exports.AddScumBanDto = void 0;
const class_validator_1 = require("class-validator");
class AddScumBanDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddScumBanDto.prototype, "steamId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddScumBanDto.prototype, "reportSource", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddScumBanDto.prototype, "reason", void 0);
exports.AddScumBanDto = AddScumBanDto;
class UpdateScumBanDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateScumBanDto.prototype, "reportSource", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateScumBanDto.prototype, "steamId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateScumBanDto.prototype, "reason", void 0);
exports.UpdateScumBanDto = UpdateScumBanDto;
class DeleteScumBanDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], DeleteScumBanDto.prototype, "reportSource", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], DeleteScumBanDto.prototype, "steamId", void 0);
exports.DeleteScumBanDto = DeleteScumBanDto;
class ListScumBanDto {
}
exports.ListScumBanDto = ListScumBanDto;
class GiveScumBanRemarkDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], GiveScumBanRemarkDto.prototype, "scumBanId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], GiveScumBanRemarkDto.prototype, "remarkServer", void 0);
exports.GiveScumBanRemarkDto = GiveScumBanRemarkDto;
//# sourceMappingURL=scum-ban.js.map