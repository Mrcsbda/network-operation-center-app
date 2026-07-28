import { logEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogDataSource {
    abstract saveLog(log: logEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<logEntity[]>;
}