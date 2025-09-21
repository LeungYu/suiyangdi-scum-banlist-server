import { NestSchedule } from 'nest-schedule';
export declare class CronService extends NestSchedule {
    sqlToOssCronJob(): Promise<void>;
    delOutdateLogAndBackupCronJob(): Promise<void>;
}
