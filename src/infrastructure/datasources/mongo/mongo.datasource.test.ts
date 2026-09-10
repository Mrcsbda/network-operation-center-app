import { afterAll, afterEach, beforeAll, describe, expect, jest, test } from '@jest/globals';
import mongoose from 'mongoose';
import { envs } from '../../../config/plugins/envs.plugin';
import { LogModel, MongoDatabase } from '../../../data/mongo';
import { LogEntity, LogSeverityLevel } from '../../../domain/entities/log.entity';
import { MongoDatasource } from './mongo.datasource';


describe('mongo-log-datasource.ts', () => {
    const logDataSource = new MongoDatasource()

    const log = new LogEntity({
        level: LogSeverityLevel.LOW,
        message: 'test message',
        origin: 'mongo-log.datasource.ts'
    })


    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        })
    })


    afterEach(async () => {
        await LogModel.deleteMany()
    })

    afterAll(async () => {
        mongoose.connection.close()
    })

    test('should create a log', async () => {
        const logSpy = jest.spyOn(console, 'log')
        await logDataSource.saveLog(log)

        expect(logSpy).toHaveBeenCalled()
        expect(logSpy).toHaveBeenCalledWith("Log saved:", expect.any(String))
    })

    test('should get logs', async () => {
        await logDataSource.saveLog(log)
        const logs = await logDataSource.getLogs(LogSeverityLevel.LOW)
        expect(logs.length).toBe(1)
        expect(logs[0]?.level).toBe(LogSeverityLevel.LOW)
    })

})