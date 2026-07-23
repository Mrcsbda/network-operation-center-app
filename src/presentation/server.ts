import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";


export class Server {
    public static start() {
        console.log("Server started");
        const cronTime = "*/10 * * * * *";
        const onTick = () => {

            const url = "https://www.google.com";
            // const url = "http://localhost:3000/posts";
            const checkServiceSuccess = () => console.log(`Success callback called, service ${url} is up`)
            const checkServiceError = (error: any) => console.log(`Error callback called with error: ${error}`)

            new CheckService(checkServiceSuccess, checkServiceError).execute(url);
        };

        CronService.createJob(cronTime, onTick);

    }
}