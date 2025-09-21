"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const app_config_1 = require("./app.config");
const common_1 = require("@nestjs/common");
const baseConfig = getEnv('base.env');
const envConfig = getEnv(`${app_config_1.ENV}.env`);
const senvConfig = Object.assign(baseConfig, envConfig);
common_1.Logger.log(`env:'${app_config_1.ENV}'`, 'loadConfig');
function getEnv(filePath) {
    return dotenv.parse(fs.readFileSync(path.resolve('./.env/', filePath))) || {};
}
class Config {
    static getConf(key) {
        return senvConfig[key];
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map