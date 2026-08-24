import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system/file-system.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { EmailService } from "./email/email.service";

const logRepository = new LogRepositoryImplementation(
    new FileSystemDatasource()
    // new MongoDataSource()
);
const emailService = new EmailService();

export class Server {
    public static async start() {
        console.log('Server started...')

        // const emailService = new EmailService(fileSystemLogRepository);
        // emailService.sendEmailWithFileSystemLoggs(['macbedoya@gmail.com'])

        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(['macbedoya@gmail.com'])

        const logs = await logRepository.getLogs(LogSeverityLevel.LOW);
        console.log("Logs with HIGH severity level:", logs);

        const cronTime = "*/10 * * * * *";
        const onTick = () => {

            const url = "https://www.googfadasle.com";
            // const url = "http://localhost:3000/posts";
            const checkServiceSuccess = () => console.log(`Success callback called, service ${url} is up`)
            const checkServiceError = (error: any) => console.log(`${error}`)

            new CheckService(logRepository, checkServiceSuccess, checkServiceError).execute(url);
        };

        // CronService.createJob(cronTime, onTick);
    }
}