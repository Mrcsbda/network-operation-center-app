import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import mongoose from 'mongoose';
import { envs } from '../../../config/plugins/envs.plugin';
import { MongoDatabase } from '../init';
import { LogModel } from './log.model';

describe('log.model.ts', () => {

    beforeAll(async () => {
        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL!,
            dbName: envs.MONGO_DB_NAME!
        })
    })

    afterAll(async () => {
        mongoose.connection.close();
    })

    test('should return LogModel', async () => {
        const logData: any = {
            level: 'LOW',
            message: 'Test log message',
            origin: 'log.model.test.ts',
        };

        const log = await LogModel.create(logData);

        expect(log).toEqual(expect.objectContaining({
            ...logData,
            createdAt: expect.any(Date),
            id: expect.any(String),
        }));

        await LogModel.findByIdAndDelete(log.id);
    })

    test('should return return the schema object', () => {
        const schema = LogModel.schema.obj;

        expect(schema).toEqual(expect.objectContaining({
            message: { type: expect.any(Function), required: true },
            level: {
                type: expect.any(Function),
                enum: ['LOW', 'MEDIUM', 'HIGH'],
                default: 'LOW'
            },
            origin: { type: expect.any(Function) },
            createdAt: expect.any(Object),
        }));

        console.log(schema)
    })
})