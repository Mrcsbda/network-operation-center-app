import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { LogEntity } from '../../entities/log.entity';
import { CheckService } from './check-service';

describe('check-service.ts', () => {
    const mockRepository: any = {
        saveLog: jest.fn(),
        getLog: jest.fn()
    }

    const successCallback = jest.fn()
    const errorCallback = jest.fn()

    const checkService = new CheckService(
        mockRepository,
        successCallback,
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should call successCallback when fetch returns true', async () => {

        const isOk = await checkService.execute('https://google.com')
        expect(isOk).toBe(true)

        expect(successCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })

    test('should call errorCallback when fetch returns false', async () => {

        const isOk = await checkService.execute('https://googlesad.com')
        expect(isOk).toBe(false)

        expect(successCallback).not.toHaveBeenCalled()
        expect(errorCallback).toHaveBeenCalled()
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })
})