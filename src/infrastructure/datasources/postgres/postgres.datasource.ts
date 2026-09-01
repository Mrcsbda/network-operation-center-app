import { LogDataSource } from "../../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "../../../generated/prisma/client";

const prismaClient = new PrismaClient();

const severityEnum = {
    [LogSeverityLevel.LOW]: SeverityLevel.LOW,
    [LogSeverityLevel.MEDIUM]: SeverityLevel.MEDIUM,
    [LogSeverityLevel.HIGH]: SeverityLevel.HIGH
}

export class PostgresDatasource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
        const level = severityEnum[log.level];

        const logSaved = await prismaClient.logModel.create({
            data: {
                ...log,
                level: level
            },
        });

        console.log(`Log saved in Postgres: ${JSON.stringify(logSaved)}`);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel];
        const logs = await prismaClient.logModel.findMany({
            where: {
                level: level
            }
        })

        // return logs.map(postgresLog => LogEntity.fromObject(postgresLog))
        return logs.map(LogEntity.fromObject)
    }

}