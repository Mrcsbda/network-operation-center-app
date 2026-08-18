import { FileSystemDatasource } from "../infrastructure/datasources/file-system/file-system.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImplementation(new FileSystemDatasource());
const emailService = new EmailService();

export class Server {
    public static start() {

        // const emailService = new EmailService(fileSystemLogRepository);
        // emailService.sendEmailWithFileSystemLoggs(['macbedoya@gmail.com'])

        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(['macbedoya@gmail.com'])

        // const cronTime = "*/10 * * * * *";
        // const onTick = () => {

        //     const url = "https://www.google.com";
        //     // const url = "http://localhost:3000/posts";
        //     const checkServiceSuccess = () => console.log(`Success callback called, service ${url} is up`)
        //     const checkServiceError = (error: any) => console.log(`${error}`)

        //     new CheckService(fileSystemLogRepository, checkServiceSuccess, checkServiceError).execute(url);
        // };

        // CronService.createJob(cronTime, onTick);
    }
}