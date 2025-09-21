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
exports.getMorgan = exports.logBussiness = exports.createMorgan = void 0;
const path = require("path");
const morgan = require("morgan");
const moment = require("moment");
const FileStreamRotator = require('file-stream-rotator');
const config_1 = require("../config/config");
let accessLogStream;
let bussinessLogStream;
function createMorgan() {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.env.SERVER_NODE_ENV === 'production') {
            accessLogStream = FileStreamRotator.getStream({
                date_format: 'YYYYMMDD',
                filename: path.resolve(config_1.Config.getConf('MORGAN_LOGS_PATH'), `../logs/access-%DATE%.log`),
                frequency: 'daily',
                size: '2m',
                verbose: false,
            });
            bussinessLogStream = FileStreamRotator.getStream({
                date_format: 'YYYYMMDD',
                filename: path.resolve(config_1.Config.getConf('MORGAN_LOGS_PATH'), `../logs/bussiness-%DATE%.log`),
                frequency: 'daily',
                size: '2m',
                verbose: false,
            });
        }
    });
}
exports.createMorgan = createMorgan;
function logBussiness(...contents) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log.apply(this, contents);
        if (process.env.SERVER_NODE_ENV === 'production') {
            for (const content of contents) {
                bussinessLogStream.write(`[${moment().format('YYYY-MM-DD HH:mm:ss ZZ')}] ${(typeof content === 'object' ? JSON.stringify(content) : content)}\n`, 'utf-8');
            }
        }
    });
}
exports.logBussiness = logBussiness;
morgan.token('localdate', () => {
    return moment().format('YYYY-MM-DD HH:mm:ss ZZ');
});
morgan.token('serverId', (req) => {
    return req.headers['scum-store-server-id'];
});
function getMorgan() {
    const developmentMorgan = morgan(function (tokens, req, res) {
        return [
            tokens.date(req, res, 'iso'),
            tokens.req(req, res, 'remote-addr'),
            tokens.method(req, res),
            tokens.url(req, res),
            tokens['response-time'](req, res), 'ms',
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens.referrer(req, res),
            tokens['user-agent'](req, res),
        ].join(' ');
    });
    const productionMorgan = morgan(function (tokens, req, res) {
        return [
            tokens.date(req, res, 'iso'),
            tokens.req(req, res, 'remote-addr'),
            tokens.method(req, res),
            tokens.url(req, res),
            tokens['response-time'](req, res), 'ms',
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens.referrer(req, res),
            tokens['user-agent'](req, res),
        ].join(' ');
    }, { stream: accessLogStream });
    return process.env.SERVER_NODE_ENV === 'development' ? developmentMorgan : productionMorgan;
}
exports.getMorgan = getMorgan;
//# sourceMappingURL=morgan-log.js.map