export enum LogSeverityLevel {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

export interface LogEntityOptions {
    message: string;
    level: LogSeverityLevel;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {
    public level: LogSeverityLevel; // Enum
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const { message, level, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.origin = origin;
        this.createdAt = createdAt;
    }

    static fromJson(json: string): LogEntity {
        json = !json.trim() ? '{}' : json;
        const { message, level, origin, createdAt } = JSON.parse(json)

        const log = new LogEntity({
            message,
            level,
            origin,
            createdAt: new Date(createdAt)
        });

        return log;
    }

    static fromObject(obj: { [key: string]: any }): LogEntity {
        const { message, level, origin, createdAt } = obj;

        Object.keys(obj).forEach(key => {
            const value = obj[key];
            if (value === undefined || value === null) throw new Error("Invalid log object: missing required property " + key);
        })

        const log = new LogEntity({
            message,
            level,
            origin,
            createdAt: new Date(createdAt)
        });

        return log;
    }
}