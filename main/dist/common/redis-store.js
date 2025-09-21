"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
const config_1 = require("../config/config");
const morgan_log_1 = require("./morgan-log");
const redisClient = redis.createClient({
    host: config_1.Config.getConf('REDIS_HOST'),
    port: +config_1.Config.getConf('REDIS_PORT'),
    auth_pass: config_1.Config.getConf('REDIS_PASS') || null,
    enable_offline_queue: false,
});
redisClient.on('message', (channel, msg) => {
    morgan_log_1.logBussiness(`"${channel}" -> "${msg}"`);
});
exports.default = redisClient;
//# sourceMappingURL=redis-store.js.map