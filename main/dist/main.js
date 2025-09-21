"use strict";
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
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const compression = require("compression");
const app_module_1 = require("./app.module");
const config_1 = require("./config/config");
const morgan_log_1 = require("./common/morgan-log");
const all_exceptions_filter_1 = require("./filter/all-exceptions-filter");
const bodyParser = require("body-parser");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        yield morgan_log_1.createMorgan();
        morgan_log_1.logBussiness('----------------------------------', process.env.SERVER_NODE_ENV);
        let app;
        if (config_1.Config.getConf('LINK_MODE') === 'HTTPS') {
            const fs = require('fs');
            const path = require('path');
            const keyPath = path.resolve(__dirname, '../.env/keys/private.pem');
            const certPath = path.resolve(__dirname, '../.env/keys/certificate.crt');
            const httpsOptions = {
                key: fs.readFileSync(keyPath),
                cert: fs.readFileSync(certPath),
            };
            app = yield core_1.NestFactory.create(app_module_1.AppModule, { httpsOptions });
        }
        else {
            app = yield core_1.NestFactory.create(app_module_1.AppModule, {});
        }
        app.use(bodyParser.json({ limit: '100mb' }));
        app.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
        }));
        app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
        app.use(compression());
        app.use(morgan_log_1.getMorgan());
        yield app.listen(config_1.Config.getConf('SERVER_PORT'), '0.0.0.0');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map