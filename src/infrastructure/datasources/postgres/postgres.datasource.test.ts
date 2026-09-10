import { afterAll, afterEach, describe, expect, jest, test } from '@jest/globals';
import { LogEntity, LogSeverityLevel } from '../../../domain/entities/log.entity';
import { PrismaClient } from '../../../generated/prisma/client';
import { PostgresDatasource } from './postgres.datasource';


describe('postgres-log-datasource.ts', () => {
    const logDataSource = new PostgresDatasource()
    const prisma = new PrismaClient();

    const log = new LogEntity({
        level: LogSeverityLevel.LOW,
        message: 'test message',
        origin: 'mongo-log.datasource.ts'
    })

    afterEach(async () => {
        await prisma.logModel.deleteMany()
    })

    afterAll(async () => {
        await prisma.$disconnect()
    })

    test('should create a log', async () => {
        const logSpy = jest.spyOn(console, 'log')
        await logDataSource.saveLog(log)

        expect(logSpy).toHaveBeenCalled()
        expect(logSpy).toHaveBeenCalledWith(expect.any(String))
    })

    test('should get logs', async () => {
        await logDataSource.saveLog(log)
        const logs = await logDataSource.getLogs(LogSeverityLevel.LOW)
        expect(logs.length).toBe(1)
        expect(logs[0]?.level).toBe(LogSeverityLevel.LOW)
    })

})