import { describe, expect, test } from '@jest/globals';
import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
import { LogDataSource } from './log.datasource';

describe('log.datasource.ts', () => {

    const newLog = new LogEntity({
        level: LogSeverityLevel.LOW,
        message: 'Test log message',
        origin: 'log.datasource.test.ts',
    })

    class MockLogDataSource implements LogDataSource {
        async saveLog(log: LogEntity): Promise<void> {
            return
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog]
        }

    }

    test('should test the abstract class', async () => {
        const mockLogDataSource = new MockLogDataSource();

        expect(mockLogDataSource).toBeInstanceOf(MockLogDataSource);
        expect(typeof mockLogDataSource.saveLog).toBe('function');
        expect(typeof mockLogDataSource.getLogs).toBe('function');

        await mockLogDataSource.saveLog(newLog);
        const logs = await mockLogDataSource.getLogs(LogSeverityLevel.LOW);
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);
        expect(logs[0]).toEqual(newLog);
    })
})