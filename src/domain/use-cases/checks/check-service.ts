interface ICheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

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
            this.successCallback();
            return true
        } catch (error) {
            this.errorCallback(`${error}`);
            return false;
        }
    }
}