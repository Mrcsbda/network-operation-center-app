import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface ICheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements ICheckServiceUseCase {
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
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {

    }

    async execute(url: string): Promise<boolean> {

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error on check service ${url}: ${response.statusText}`); // se hace esto para que el error sea capturado en el catch y se ejecute el callback de error
            }

            const log = new LogEntity(`Service ${url} is working`, LogSeverityLevel.LOW);
            this.logRepository.saveLog(log);

            this.successCallback && this.successCallback();
            return true
        } catch (error) {
            const errorMessage = `${url} is no okay. ${error}`
            const log = new LogEntity(errorMessage, LogSeverityLevel.HIGH);
            this.logRepository.saveLog(log);

            this.errorCallback && this.errorCallback(`${errorMessage}`);
            return false;
        }
    }
}