import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendEmailLogsUseCase {
    execute(to: string | string[]): Promise<boolean>;
}

export class SendEmailLogs implements SendEmailLogsUseCase {
    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ) {

    }
    async execute(to: string | string[]): Promise<boolean> {
        try {
            const sent = await this.emailService.sendEmailWithFileSystemLoggs(to);
            if (!sent) {
                throw new Error('Log email failed to send');
            }

            const newLog = new LogEntity({
                message: `Log email sent to ${to}"`,
                level: LogSeverityLevel.HIGH,
                origin: 'send-email-logs.ts'
            });
            await this.logRepository.saveLog(newLog);
            return true
        } catch (error) {
            const newLog = new LogEntity({
                message: `Log email failed to send to ${to}"`,
                level: LogSeverityLevel.HIGH,
                origin: 'send-email-logs.ts'
            });
            await this.logRepository.saveLog(newLog);
            return false
        }
    }

}