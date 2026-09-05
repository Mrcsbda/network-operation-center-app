import * as fs from 'fs';
import { LogDataSource } from "../../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDataSource {

    private readonly logPath: string = 'logs/';
    private readonly allLogsPath: string = 'logs/logs-all.log';
    private readonly mediumLogsPath: string = 'logs/logs-medium.log';
    private readonly highLogsPath: string = 'logs/logs-high.log';

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles(): void {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach((path) => {
            if (fs.existsSync(path)) return
            fs.writeFileSync(path, '');
        });
    }

    async saveLog(newLog: LogEntity): Promise<void> {
        const logAsJson = `${JSON.stringify(newLog)}\n`;

        // append file sync add a new line with the log information to the logs-all.log file at the end of the file
        fs.appendFileSync(this.allLogsPath, logAsJson);

        switch (newLog.level) {
            case LogSeverityLevel.LOW:
                return;
            case LogSeverityLevel.MEDIUM:
                fs.appendFileSync(this.mediumLogsPath, logAsJson);
                break;
            case LogSeverityLevel.HIGH:
                fs.appendFileSync(this.highLogsPath, logAsJson);
                break;
            default:
                throw new Error(`Invalid log severity level: ${newLog.level}`);
        }
    }

    private getLogsFromFile(filePath: string): LogEntity[] {
        // read the file synchronously and return an array of LogEntity objects
        const content = fs.readFileSync(filePath, 'utf-8');
        if (!content.trim()) return [];
        // const logsExample: LogEntity[] = content.split('\n')
        //     .map((log: string) => LogEntity.fromJson(log))
        const logs: LogEntity[] = content.split('\n')
            .filter((log: string) => log.trim() !== '')
            .map(LogEntity.fromJson)

        return logs;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeverityLevel.LOW:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.MEDIUM:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.HIGH:
                return this.getLogsFromFile(this.highLogsPath);
            default:
                throw new Error(`Invalid log severity level: ${severityLevel}`);
        }
    }

}