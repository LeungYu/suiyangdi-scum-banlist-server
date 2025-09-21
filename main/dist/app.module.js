"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const ORMConfig = require("./config/typeorm.config");
const config_1 = require("./config/config");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_redis_1 = require("nestjs-redis");
const common_1 = require("@nestjs/common");
const auth_check_middleware_1 = require("./middleware/auth-check.middleware");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const scum_ban_module_1 = require("./modules/scum-ban/scum-ban.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(auth_check_middleware_1.AuthCheckMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(ORMConfig),
            nestjs_redis_1.RedisModule.register({
                host: config_1.Config.getConf('REDIS_HOST'),
                port: +config_1.Config.getConf('REDIS_PORT'),
                password: config_1.Config.getConf('REDIS_PASS') || null,
                db: config_1.Config.getConf('REDIS_DB') ? parseInt(config_1.Config.getConf('REDIS_DB'), 10) : 0,
            }),
            scum_ban_module_1.ScumBanModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map