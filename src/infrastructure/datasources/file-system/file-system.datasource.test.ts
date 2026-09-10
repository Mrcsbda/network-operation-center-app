import { beforeEach, describe, expect, test } from '@jest/globals';
import { readdirSync, readFileSync, rmSync } from 'fs';
import path from 'path';
import { LogEntity, LogSeverityLevel } from '../../../domain/entities/log.entity';
import { FileSystemDatasource } from './file-system.datasource';

describe('file-system.datasource', () => {

    const logPath = path.join(__dirname, '../../../../logs')

    beforeEach(() => {
        rmSync(logPath, { recursive: true, force: true })
    })

    test('should create log files if they do not exists', () => {
        new FileSystemDatasource()

        const files = readdirSync(logPath)
        expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log'])
    })

    test('should save a log in logs-all.log', () => {
        const logDatasource = new FileSystemDatasource()
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.LOW,
            origin: 'file-systema.datasource.test.ts'
        })

        logDatasource.saveLog(log)
        const allLogs = readFileSync(`${logPath}/logs-all.log`, 'utf-8')
        expect(allLogs).toContain(JSON.stringify(log))
    })

    test('should save a log in logs-all.log and logs-medium.log', () => {
        const logDatasource = new FileSystemDatasource()
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.MEDIUM,
            origin: 'file-systema.datasource.test.ts'
        })

        logDatasource.saveLog(log)
        const allLogs = readFileSync(`${logPath}/logs-all.log`, 'utf-8')
        const mediumLogs = readFileSync(`${logPath}/logs-medium.log`, 'utf-8')

        expect(allLogs).toContain(JSON.stringify(log))
        expect(mediumLogs).toContain(JSON.stringify(log))
    })

    test('should save a log in logs-all.log and logs-high.log', () => {
        const logDatasource = new FileSystemDatasource()
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.HIGH,
            origin: 'file-systema.datasource.test.ts'
        })

        logDatasource.saveLog(log)
        const allLogs = readFileSync(`${logPath}/logs-all.log`, 'utf-8')
        const highLogs = readFileSync(`${logPath}/logs-high.log`, 'utf-8')

        expect(allLogs).toContain(JSON.stringify(log))
        expect(highLogs).toContain(JSON.stringify(log))
    })

    test('should return all logs', async () => {
        const logDatasource = new FileSystemDatasource()
        const logs: any = Array.from({ length: 3 }, (_, i) => (
            new LogEntity({
                message: `log ${i}`,
                level: i === 0 ? LogSeverityLevel.LOW : i === 1 ? LogSeverityLevel.HIGH : LogSeverityLevel.MEDIUM,
                origin: 'file-systema.datasource.test.ts'
            })
        ))

        const logHigh = logs.find((l: any) => l.level === LogSeverityLevel.HIGH)
        const logMedium = logs.find((l: any) => l.level === LogSeverityLevel.MEDIUM)

        await logDatasource.saveLog(logs[0])
        await logDatasource.saveLog(logHigh)
        await logDatasource.saveLog(logMedium)

        const logsLow = await logDatasource.getLogs(LogSeverityLevel.LOW)
        const logsHigh = await logDatasource.getLogs(LogSeverityLevel.HIGH)
        const logsMedium = await logDatasource.getLogs(LogSeverityLevel.MEDIUM)

        expect(logsLow).toEqual(expect.arrayContaining(logs))
        expect(logsHigh).toEqual(expect.arrayContaining([logHigh]))
        expect(logsMedium).toEqual(expect.arrayContaining([logMedium]))
    })
})