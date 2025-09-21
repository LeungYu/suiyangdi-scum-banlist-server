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
exports.CronService = void 0;
const common_1 = require("@nestjs/common");
const nest_schedule_1 = require("nest-schedule");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
const os = require("os");
const compressing = require("compressing");
const config_1 = require("./config/config");
const morgan_log_1 = require("./common/morgan-log");
const files_1 = require("./common/files");
const oss_client_1 = require("./common/oss-client");
let CronService = class CronService extends nest_schedule_1.NestSchedule {
    sqlToOssCronJob() {
        return __awaiter(this, void 0, void 0, function* () {
            const processResult = [];
            const timeStamp = Date.now();
            const date = new Date(timeStamp);
            const [year, month, day, hour] = [
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate(),
                date.getHours(),
            ];
            const BACKUP_BASE_TEMP_PATH = config_1.Config.getConf('BACKUP_BASE_TEMP_PATH');
            const MYSQL_PASS = config_1.Config.getConf('MYSQL_PASS');
            const MYSQL_PORT = config_1.Config.getConf('MYSQL_PORT');
            const MYSQL_BIN_PATH = config_1.Config.getConf('MYSQL_BIN_PATH');
            try {
                const configs = JSON.parse(yield fs.readFileSync(config_1.Config.getConf('BACKUP_LIST_FILE'), 'utf8'));
                for (const config of configs) {
                    try {
                        const isBackupBasePathExist = yield files_1.dirExists(path.resolve(config_1.Config.getConf('BACKUP_BASE_TEMP_PATH'), config.mark));
                        yield Promise.all([
                            yield fs.writeFileSync(path.resolve(BACKUP_BASE_TEMP_PATH, `./${config.mark}/app.js`), path.resolve(config.basePath, `./store-front/app.js`)),
                            yield fs.writeFileSync(path.resolve(BACKUP_BASE_TEMP_PATH, `./${config.mark}/env-admin.js`), path.resolve(config.basePath, `./store-front/env-admin.js`)),
                            yield fs.writeFileSync(path.resolve(BACKUP_BASE_TEMP_PATH, `./${config.mark}/env-store.js`), path.resolve(config.basePath, `./store-front/env-store.js`)),
                            yield fs.writeFileSync(path.resolve(BACKUP_BASE_TEMP_PATH, `./${config.mark}/production.env`), path.resolve(config.basePath, `./store-back/.env/production.env`)),
                        ]);
                    }
                    catch (e) {
                        morgan_log_1.logScheduleBackup(`整理复制文件出错(${config.mark}):` + e.toString());
                        processResult.push({
                            target: config.mark,
                            success: false,
                            content: `整理复制文件出错(${config.mark}):` + e.toString(),
                        });
                        continue;
                    }
                    try {
                        yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                            const shell = require('node-powershell');
                            const powerShell = new shell({
                                executionPolicy: 'Bypass',
                                noProfile: true,
                            });
                            try {
                                morgan_log_1.logScheduleBackup(true, `cd "${MYSQL_BIN_PATH}"`);
                                morgan_log_1.logScheduleBackup(true, `${os.platform() === 'win32' ? './mysqldump' : '.\\mysqldump'} --default-character-set=utf8mb4 -uroot -p${MYSQL_PASS} -P${MYSQL_PORT} ${config.database} --hex-blob --result-file="${path.resolve(BACKUP_BASE_TEMP_PATH, `./${config.mark}/${config.database}.sql`)}"`);
                                powerShell.addCommand(`cd "${MYSQL_BIN_PATH}"`);
                                powerShell.addCommand(`${os.platform() === 'win32' ? './mysqldump' : '.\\mysqldump'} --default-character-set=utf8mb4 -uroot -p${MYSQL_PASS} -P${MYSQL_PORT} ${config.database} --hex-blob --result-file="${path.resolve(BACKUP_BASE_TEMP_PATH, `./${config.mark}/${config.database}.sql`)}"`);
                                const resProcessMainCommand = yield powerShell.invoke();
                                powerShell.dispose();
                                setTimeout(() => {
                                    morgan_log_1.logScheduleBackup(true, `【过程(${config.mark})】mysqldump执行结果: `, {
                                        resProcessMainCommand,
                                    });
                                });
                                resolve();
                            }
                            catch (e) {
                                powerShell.dispose();
                                morgan_log_1.logScheduleBackup(true, `【捕获(${config.mark})】排除MySQL安全警告: `);
                                if (e.toString().includes('mysqldump: [Warning] Using a password on the command line interface can be insecure.')) {
                                    resolve();
                                }
                                else {
                                    morgan_log_1.logScheduleBackup(true, { e });
                                    reject(e);
                                }
                            }
                        }));
                    }
                    catch (e) {
                        morgan_log_1.logScheduleBackup(`备份数据库出错(${config.mark}):` + e.toString());
                        processResult.push({
                            target: config.mark,
                            success: false,
                            content: `备份数据库出错(${config.mark}):` + e.toString(),
                        });
                        continue;
                    }
                    try {
                        yield new Promise((resolve, reject) => {
                            compressing.zip.compressDir(path.resolve(BACKUP_BASE_TEMP_PATH, `./${config.mark}`), path.resolve(BACKUP_BASE_TEMP_PATH, `./${config.mark}.zip`))
                                .then(() => {
                                morgan_log_1.logScheduleBackup(`压缩文件夹成功(${config.mark})`);
                                resolve();
                            })
                                .catch(e => {
                                reject(e);
                            });
                        });
                    }
                    catch (e) {
                        morgan_log_1.logScheduleBackup(`压缩文件夹出错(${config.mark}):` + e.toString());
                        processResult.push({
                            target: config.mark,
                            success: false,
                            content: `压缩文件夹出错(${config.mark}):` + e.toString(),
                        });
                        continue;
                    }
                    try {
                        const resUploadOss = yield oss_client_1.default.uploadFile(`${process.env.SERVER_NODE_ENV || 'development'}/${year}-${month}-${day}-${hour}/${config.mark}.zip`, path.resolve(BACKUP_BASE_TEMP_PATH, `./${config.mark}.zip`));
                        morgan_log_1.logScheduleBackup(`上传OSS结果:`);
                        morgan_log_1.logScheduleBackup(resUploadOss);
                        if (resUploadOss.statusCode === 200) {
                            processResult.push({
                                target: config.mark,
                                success: true,
                                content: `成功`,
                            });
                        }
                        else {
                            morgan_log_1.logScheduleBackup(`上传OSS出错(${config.mark}):` + JSON.stringify(resUploadOss));
                            processResult.push({
                                target: config.mark,
                                success: false,
                                content: `上传OSS出错(${config.mark}):` + JSON.stringify(resUploadOss),
                            });
                            continue;
                        }
                    }
                    catch (e) {
                        morgan_log_1.logScheduleBackup(`上传OSS出错(${config.mark}):` + e.toString());
                        processResult.push({
                            target: config.mark,
                            success: false,
                            content: `上传OSS出错(${config.mark}):` + e.toString(),
                        });
                        continue;
                    }
                }
                morgan_log_1.logScheduleBackup(`${year}-${month}-${day}-${hour}运行结果:`);
                morgan_log_1.logScheduleBackup({ processResult });
                try {
                    morgan_log_1.logScheduleBackup(`删除临时文件夹:`);
                    if (fs.existsSync(BACKUP_BASE_TEMP_PATH)) {
                        yield files_1.rmdirAsync(BACKUP_BASE_TEMP_PATH);
                        morgan_log_1.logScheduleBackup(`删除临时文件夹成功`);
                    }
                }
                catch (e) {
                    morgan_log_1.logScheduleBackup(`删除临时文件夹出错:` + e.toString());
                }
            }
            catch (e) {
                morgan_log_1.logScheduleBackup('读取解析配置文件出错:' + e.toString());
            }
        });
    }
    delOutdateLogAndBackupCronJob() {
        return __awaiter(this, void 0, void 0, function* () {
            const processResult = [];
            const timeStamp = Date.now();
            const date = new Date(timeStamp);
            const [year, month, day, hour] = [
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate(),
                date.getHours(),
            ];
            try {
                const allStats = {};
                const storeListConfigs = JSON.parse(yield fs.readFileSync(config_1.Config.getConf('STORE_LIST_FILES'), 'utf8'));
                for (const storeConfig of storeListConfigs[0]) {
                    morgan_log_1.logScheduleBackup(storeConfig);
                    morgan_log_1.logScheduleBackup(`清理${storeConfig.store}服务器日志`);
                    if ((yield files_1.dirExists(storeConfig.logFilePath))) {
                        const deleteFilePromise = [];
                        const logFileList = yield files_1.readDir(storeConfig.logFilePath);
                        const logFileTotal = logFileList.length;
                        morgan_log_1.logScheduleBackup(`筛选${storeConfig.store}服务器应删除日志文件列表`);
                        for (const fileName of logFileList) {
                            const splitBarArray = fileName.split('-');
                            const splitDotArray = splitBarArray[splitBarArray.length - 1].split('.');
                            const targetYyyyMmDd = splitDotArray[0];
                            const targetTimeStamp = moment(targetYyyyMmDd).valueOf();
                            if (timeStamp - targetTimeStamp >= 1000 * 60 * 60 * 24 * 3) {
                                deleteFilePromise.push(yield new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                                    try {
                                        yield fs.unlinkSync(path.resolve(storeConfig.logFilePath, fileName));
                                        resolve(true);
                                    }
                                    catch (e) {
                                        const errMsg = `删除文件"${path.resolve(storeConfig.logFilePath, fileName)}"出错: ${e.toString()}`;
                                        morgan_log_1.logScheduleBackup(errMsg);
                                        resolve(errMsg);
                                    }
                                })));
                            }
                        }
                        const mysqlLocalBackupFileList = yield files_1.readDir(storeConfig.mysqlLocalBackupFilePath);
                        const mysqlLocalBackupFileTotal = mysqlLocalBackupFileList.length;
                        morgan_log_1.logScheduleBackup(`筛选${storeConfig.store}服务器应删除本地sql备份文件列表`);
                        for (const fileName of mysqlLocalBackupFileList) {
                            const splitBarArray = fileName.split('-');
                            const splitDotArray = splitBarArray[splitBarArray.length - 1].split('.');
                            const targetTimeStamp = splitDotArray[0];
                            if (timeStamp - targetTimeStamp >= 1000 * 60 * 60 * 24 * 3) {
                                deleteFilePromise.push(yield new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                                    try {
                                        yield fs.unlinkSync(path.resolve(storeConfig.mysqlLocalBackupFilePath, fileName));
                                        resolve(true);
                                    }
                                    catch (e) {
                                        const errMsg = `删除文件"${path.resolve(storeConfig.mysqlLocalBackupFilePath, fileName)}"出错: ${e.toString()}`;
                                        morgan_log_1.logScheduleBackup(errMsg);
                                        resolve(errMsg);
                                    }
                                })));
                            }
                        }
                        try {
                            const deleteFileResults = yield Promise.all(deleteFilePromise);
                            allStats[storeConfig.store] = {
                                allLogFile: logFileTotal,
                                allMysqlLocalBackupFileFile: mysqlLocalBackupFileTotal,
                                shouldDeleteFile: deleteFileResults.length,
                                successDeleteFile: deleteFileResults.filter(T => T === true).length,
                                errorDeleteFile: deleteFileResults.filter(T => T !== true).length,
                            };
                            morgan_log_1.logScheduleBackup(`${storeConfig.store}服务器运行结果(只展示错误):`);
                            morgan_log_1.logScheduleBackup({ deleteFileResults: deleteFileResults.filter(T => T !== true) });
                        }
                        catch (e) {
                            morgan_log_1.logScheduleBackup(`删除过程出错: ${e.toString()}`);
                        }
                    }
                    else {
                        morgan_log_1.logScheduleBackup(`路径不存在: ${storeConfig.logFilePath}`);
                    }
                }
                morgan_log_1.logScheduleBackup(`${year}-${month}-${day}-${hour}运行结果:`);
                morgan_log_1.logScheduleBackup({ allStats });
            }
            catch (e) {
                morgan_log_1.logScheduleBackup('读取解析配置文件出错:' + e.toString());
            }
        });
    }
};
__decorate([
    nest_schedule_1.Cron('0 0 4,16 * * ? '),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "sqlToOssCronJob", null);
__decorate([
    nest_schedule_1.Cron('0 0 5 * * ? '),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "delOutdateLogAndBackupCronJob", null);
CronService = __decorate([
    common_1.Injectable()
], CronService);
exports.CronService = CronService;
//# sourceMappingURL=cron.service.js.map