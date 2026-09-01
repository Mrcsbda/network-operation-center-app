import { CheckService } from "../domain/use-cases/checks/check-service";
import { PostgresDatasource } from "../infrastructure/datasources/postgres/postgres.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const logRepository = new LogRepositoryImplementation(
    // new FileSystemDatasource()
    // new MongoDatasource()
    new PostgresDatasource()
);
const emailService = new EmailService();

export class Server {
    public static async start() {
        console.log('Server started...')

        // const emailService = new EmailService();
        // emailService.sendEmailWithFileSystemLoggs(['macbedoya@gmail.com'])

        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(['macbedoya@gmail.com'])

        // const logs = await logRepository.getLogs(LogSeverityLevel.LOW);

        const cronTime = "*/10 * * * * *";
        const onTick = () => {

            const url = "https://www.google.com";
            // const url = "http://localhost:3000/posts";
            const checkServiceSuccess = () => console.log(`Success callback called, service ${url} is up`)
            const checkServiceError = (error: any) => console.log(`${error}`)

            new CheckService(logRepository, checkServiceSuccess, checkServiceError).execute(url);
        };

        CronService.createJob(cronTime, onTick);
    }
}