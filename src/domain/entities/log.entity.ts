export enum LogSeverityLevel {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

export class logEntity {
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
}