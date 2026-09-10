import { describe, expect, jest, test } from '@jest/globals';
import nodemailer from 'nodemailer';
import { EmailService, SendMailOptions } from './email.service';


describe('email-services.ts', () => {

    const mockSendMail = jest.fn()

    // Mock al createTransporter
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    }) as any

    const emailService = new EmailService()

    test('should send email', async () => {
        const options: SendMailOptions = {
            to: 'macbedoya@google.com',
            subject: 'test',
            htmlBody: '<h1>test</h1>'
        }

        await emailService.sendEmail(options)

        expect(mockSendMail).toHaveBeenCalledWith({
            "attachments": expect.any(Array),
            "html": "<h1>test</h1>",
            "subject": "test",
            "to": "macbedoya@google.com",
        })
    })

    test('should send email with attachements', async () => {
        const email = 'fernando@google.com'
        await emailService.sendEmailWithFileSystemLogs(email)

        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: 'Logs from the system',
            attachments: expect.arrayContaining([
                {
                    path: './logs/logs-all.log',
                    filename: 'logs-all.log'
                },
                {
                    path: './logs/logs-high.log',
                    filename: 'logs-high.log'
                },
                {
                    path: './logs/logs-medium.log',
                    filename: 'logs-medium.log'
                }
            ]),
            html: expect.any(String)
        })
    })
})