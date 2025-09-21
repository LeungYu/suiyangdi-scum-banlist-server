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
exports.ScumBan = void 0;
const typeorm_1 = require("typeorm");
let ScumBan = class ScumBan {
    constructor(steamId, reportSource, reason, userName, scumId) {
        this.steamId = steamId;
        this.userName = userName;
        this.reportSource = reportSource;
        this.reason = reason;
        if (userName !== undefined) {
            this.userName = userName;
        }
        if (scumId !== undefined) {
            this.scumId = scumId;
        }
        this.createdTimeStamp = Date.now() + '';
    }
};
__decorate([
    typeorm_1.PrimaryColumn(),
    typeorm_1.Generated('uuid'),
    __metadata("design:type", String)
], ScumBan.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 17 }),
    __metadata("design:type", String)
], ScumBan.prototype, "steamId", void 0);
__decorate([
    typeorm_1.Column({ length: 50 }),
    __metadata("design:type", String)
], ScumBan.prototype, "reportSource", void 0);
__decorate([
    typeorm_1.Column({ type: 'longblob' }),
    __metadata("design:type", String)
], ScumBan.prototype, "reason", void 0);
__decorate([
    typeorm_1.Column({ length: 50, default: null }),
    __metadata("design:type", String)
], ScumBan.prototype, "userName", void 0);
__decorate([
    typeorm_1.Column({ length: 50, default: null }),
    __metadata("design:type", String)
], ScumBan.prototype, "scumId", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], ScumBan.prototype, "valid", void 0);
__decorate([
    typeorm_1.Column({ length: 13 }),
    __metadata("design:type", String)
], ScumBan.prototype, "createdTimeStamp", void 0);
ScumBan = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [String, String, String, String, String])
], ScumBan);
exports.ScumBan = ScumBan;
//# sourceMappingURL=scum-ban.entity.js.map