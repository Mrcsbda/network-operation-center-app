export enum LogSeverityLevel {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

export class LogEntity {
    public level: LogSeverityLevel; // Enum
    public message: string;
    public createdAt: Date;

    constructor(
        message: string,
        level: LogSeverityLevel
    ) {
        this.message = message;
        this.level = level;
        this.createdAt = new Date()
    }

    static fromJSON(json: string): LogEntity {
        const { message, level, createdAt } = JSON.parse(json)

        const log = new LogEntity(message, level);
        log.createdAt = new Date(createdAt);
        return log;
    }
}