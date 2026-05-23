interface ICheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements ICheckServiceUseCase {

    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) { }

    async execute(url: string): Promise<boolean> {

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error on check service ${url}: ${response.statusText}`);
            }
            this.successCallback();
            return true
        } catch (error) {
            this.errorCallback(`${error}`);
            return false;
        }
    }
}