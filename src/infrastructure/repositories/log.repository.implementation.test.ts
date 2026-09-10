import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepositoryImplementation } from './log.repository.implementation';


describe('postgres-log-datasource.ts', () => {

    const mockDataSource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    } as LogDataSource

    const logRepositoryImplementacion = new LogRepositoryImplementation(mockDataSource)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('savelog should call the datasource with the arguments', async () => {
        const newLog = new LogEntity({
            level: LogSeverityLevel.LOW,
            message: 'Test log message',
            origin: 'log.repository.implementation.test.ts',
        })

        await logRepositoryImplementacion.saveLog(newLog)

        expect(mockDataSource.saveLog).toHaveBeenCalledWith(newLog)
    })

    test('getlog should call the datasource with the arguments', async () => {
        const logSeverity = LogSeverityLevel.LOW
        await logRepositoryImplementacion.getLogs(logSeverity)

        expect(mockDataSource.getLogs).toHaveBeenCalledWith(logSeverity)
    })


})