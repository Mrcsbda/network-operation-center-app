import { afterAll, describe, expect, test } from '@jest/globals';
import mongoose from 'mongoose';
import { MongoDatabase } from './init';

describe('init.ts', () => {

    afterAll(async () => {
        mongoose.connection.close();
    })

    test('should connect to MongoDB', async () => {

        const connected = await MongoDatabase.connect({
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!
        })

        expect(connected).toBe(true)
    })

    test('should throw an error', async () => {
        try {
            await MongoDatabase.connect({
                mongoUrl: 'mongodb://mariana:12389@localhostasdf:27017',
                dbName: process.env.MONGO_DB_NAME!
            })
            expect(true).toBe(false)
        } catch (error) {

        }
    })
})