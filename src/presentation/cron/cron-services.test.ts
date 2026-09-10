import { describe, expect, jest, test } from '@jest/globals';
import { CronService } from './cron-service';

describe('cron-services.ts', () => {
    const mockTick = jest.fn()
    test('should create a job', (done) => {
        const job = CronService.createJob('* * * * * *', mockTick)

        setTimeout(() => {
            expect(mockTick).toHaveBeenCalledTimes(2)
            job.stop()
            done()
        }, 2000)
    })
})