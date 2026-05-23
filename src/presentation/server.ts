import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";


export class Server {
    public static start() {
        console.log("Server started");
        const cronTime = "*/10 * * * * *";
        const onTick = () => {

            const url = "https://www.google.com";

            new CheckService(
                () => console.log(`Success callback called, service ${url} is up`),
                (error) => console.log(`Error callback called with error: ${error}`)
            )
                .execute(url);
            // new CheckService().execute("http://localhost:3000/posts")
        };

        CronService.createJob(cronTime, onTick);

    }
}