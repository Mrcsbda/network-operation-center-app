import { describe, expect, test } from '@jest/globals';
import { LogEntity, LogSeverityLevel } from './log.entity';

describe('log.entities.ts', () => {
    const dataObject = {
        level: LogSeverityLevel.LOW,
        message: 'Test log message',
        origin: 'log.entities.test.ts',
    }
    test('should create a LogEntity instance', async () => {
        const newLog = new LogEntity(dataObject);

        expect(newLog).toBeInstanceOf(LogEntity);
        expect(newLog.message).toBe(dataObject.message);
        expect(newLog.origin).toBe(dataObject.origin);
        expect(newLog.level).toBe(dataObject.level);
        expect(newLog.createdAt).toBeInstanceOf(Date);
    })

    test('should create a LogEntity instance fromJson', async () => {
        const json = `{"message":"Service https://www.google.com is working","level":"LOW","origin":"check-service.ts","createdAt":"2026-09-02T22:25:20.498Z"}`

        const newLog = LogEntity.fromJson(json);

        expect(newLog).toBeInstanceOf(LogEntity);
        expect(newLog.message).toBe('Service https://www.google.com is working');
        expect(newLog.origin).toBe('check-service.ts');
        expect(newLog.level).toBe(LogSeverityLevel.LOW);
        expect(newLog.createdAt).toBeInstanceOf(Date);
    })

    test('should create a LogEntity instance fromObject', async () => {
        const newLog = LogEntity.fromObject(dataObject);

        expect(newLog).toBeInstanceOf(LogEntity);
        expect(newLog.message).toBe(dataObject.message);
        expect(newLog.origin).toBe(dataObject.origin);
        expect(newLog.level).toBe(dataObject.level);
        expect(newLog.createdAt).toBeInstanceOf(Date);
    })
})