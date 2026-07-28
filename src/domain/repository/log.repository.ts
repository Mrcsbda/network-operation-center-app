import { logEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogRepository {
    abstract saveLog(log: logEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<logEntity[]>;
}