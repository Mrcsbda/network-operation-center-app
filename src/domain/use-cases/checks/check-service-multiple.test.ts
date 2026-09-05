import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { LogEntity } from '../../entities/log.entity';
import { CheckServiceMultiple } from './check-service-multiple';

describe('check-service-multitple.ts', () => {
    const mockRepositories: any = Array.from({ length: 3 }, () => (
        {
            saveLog: jest.fn(),
            getLog: jest.fn()
        }
    ))

    const successCallback = jest.fn()
    const errorCallback = jest.fn()

    const checkServiceMultiple = new CheckServiceMultiple(
        mockRepositories,
        successCallback,
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should call successCallback when fetch returns true', async () => {

        const isOk = await checkServiceMultiple.execute('https://google.com')
        expect(isOk).toBe(true)

        expect(successCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()
        mockRepositories.forEach((repo: any) => {
            expect(repo.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        });
    })

    test('should call errorCallback when fetch returns false', async () => {

        const isOk = await checkServiceMultiple.execute('https://googlesad.com')
        expect(isOk).toBe(false)

        expect(successCallback).not.toHaveBeenCalled()
        expect(errorCallback).toHaveBeenCalled()
        mockRepositories.forEach((repo: any) => {
            expect(repo.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        });
    })
})