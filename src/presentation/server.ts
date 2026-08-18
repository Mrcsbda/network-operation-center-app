import { FileSystemDatasource } from "../infrastructure/datasources/file-system/file-system.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImplementation(new FileSystemDatasource());

export class Server {
    public static start() {
        console.log("Server started");

        const emailService = new EmailService();
        emailService.sendEmail({
            to: "macbedoya@gmail.com",
            subject: "Logs de sistema",
            htmlBody: `
            <h2>Logs de sistema - NOC</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Ver logs adjuntos</p>
            `
        })


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