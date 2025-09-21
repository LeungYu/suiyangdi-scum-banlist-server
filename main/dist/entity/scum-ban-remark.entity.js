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
exports.ScumBanRemark = exports.Remark = void 0;
const typeorm_1 = require("typeorm");
var Remark;
(function (Remark) {
    Remark[Remark["ARGEE"] = 0] = "ARGEE";
    Remark[Remark["DISARGEE"] = 1] = "DISARGEE";
})(Remark = exports.Remark || (exports.Remark = {}));
let ScumBanRemark = class ScumBanRemark {
    constructor(scumBanId, remarkServer, remark) {
        this.scumBanId = scumBanId;
        this.remarkServer = remarkServer;
        this.remark = remark;
        this.createdTimeStamp = Date.now() + '';
    }
};
__decorate([
    typeorm_1.PrimaryColumn(),
    typeorm_1.Generated('uuid'),
    __metadata("design:type", String)
], ScumBanRemark.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 50 }),
    __metadata("design:type", String)
], ScumBanRemark.prototype, "scumBanId", void 0);
__decorate([
    typeorm_1.Column({ length: 50 }),
    __metadata("design:type", String)
], ScumBanRemark.prototype, "remarkServer", void 0);
__decorate([
    typeorm_1.Column({ type: 'int' }),
    __metadata("design:type", Number)
], ScumBanRemark.prototype, "remark", void 0);
__decorate([
    typeorm_1.Column({ length: 13 }),
    __metadata("design:type", String)
], ScumBanRemark.prototype, "createdTimeStamp", void 0);
ScumBanRemark = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [String, String, Number])
], ScumBanRemark);
exports.ScumBanRemark = ScumBanRemark;
//# sourceMappingURL=scum-ban-remark.entity.js.map