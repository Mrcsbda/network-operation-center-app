import { LogEntity, LogEntityOptions, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";



interface ICheckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements ICheckServiceMultipleUseCase {
    // private successCallback: SuccessCallback;
    // private errorCallback: ErrorCallback;

    // constructor(
    //     successCallback: SuccessCallback,
    //     errorCallback: ErrorCallback
    // ) {
    //     this.successCallback = successCallback;
    //     this.errorCallback = errorCallback;
    // }

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {

    }

    private async saveLogs(log: LogEntity): Promise<void> {
        this.logRepository.forEach(async (repository) => {
            await repository.saveLog(log);
        })
    }

    async execute(url: string): Promise<boolean> {

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error on check service ${url}: ${response.statusText}`); // se hace esto para que el error sea capturado en el catch y se ejecute el callback de error
            }

            const newLog: LogEntityOptions = {
                message: `Service ${url} is working`,
                level: LogSeverityLevel.LOW,
                origin: 'check-service.ts',
                createdAt: new Date()
            }

            const log = new LogEntity(newLog);
            await this.saveLogs(log);

            this.successCallback && this.successCallback();
            return true
        } catch (error) {
            const errorMessage = `${url} is no okay. ${error}`

            const newLog: LogEntityOptions = {
                message: errorMessage,
                level: LogSeverityLevel.HIGH,
                origin: 'check-service.ts',
                createdAt: new Date()
            }

            const log = new LogEntity(newLog);
            await this.saveLogs(log);

            this.errorCallback && this.errorCallback(`${errorMessage}`);
            return false;
        }
    }
}