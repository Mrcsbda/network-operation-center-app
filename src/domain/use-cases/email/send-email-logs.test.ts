import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { LogEntity } from '../../entities/log.entity';
import { SendEmailLogs } from './send-email-logs';

describe('send-email-logs.ts', () => {
    const mockSendEmailServce: any = {
        sendEmail: jest.fn(async () => true),
        sendEmailWithFileSystemLogs: jest.fn(async () => true)
    }

    const mockRepository: any = {
        saveLog: jest.fn(),
        getLog: jest.fn()
    }

    const sendEmailLogs = new SendEmailLogs(
        mockSendEmailServce,
        mockRepository,
    );

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should call sendEmailWithFileSystemLoggs and save log', async () => {
        const email = 'a@b.com'
        const isOk = await sendEmailLogs.execute(email)
        expect(isOk).toBe(true)

        expect(mockSendEmailServce.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(email)
        expect(mockSendEmailServce.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            {
                createdAt: expect.any(Date),
                level: "LOW",
                message: "Log email sent to a@b.com\"",
                origin: "send-email-logs.ts"
            }
        )
    })

    test('should save log in case of error', async () => {
        mockSendEmailServce.sendEmailWithFileSystemLogs.mockResolvedValue(false)
        const email = 'a@b.com'
        const isOk = await sendEmailLogs.execute(email)
        expect(isOk).toBe(false)

        expect(mockSendEmailServce.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(email)
        expect(mockSendEmailServce.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            {
                createdAt: expect.any(Date),
                level: "HIGH",
                message: "Log email failed to send to a@b.com\"",
                origin: "send-email-logs.ts"
            }
        )
    })


})