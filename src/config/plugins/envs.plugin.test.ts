import { describe, expect, jest, test } from '@jest/globals';
import { envs } from './envs.plugin';

describe('env.plugin.ts', () => {

    test('should return env options', () => {
        console.log(envs)
        expect(envs).toEqual({
            PORT: 3000,
            PROD: true,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'mariana.c.bedoya.8@gmail.com',
            MAILER_SECRET_KEY: 'csprjyllbqjebnmj',
            MONGO_URL: 'mongodb://mariana:123456789@localhost:27017',
            MONGO_DB_NAME: 'NOC_TEST',
            MONGO_USER: 'mariana',
            MONGO_PASS: '123456789'
        })
    })

    test('should return error if not found env', async () => {
        jest.resetModules();
        process.env.PORT = 'ABC'
        try {
            await import('./envs.plugin');
            expect(true).toBe(false)
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer')
        }
    })

})