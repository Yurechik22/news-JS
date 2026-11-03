import {
    Callback,
    Endpoint,
    ErrorCallback,
    HttpMethod,
    HttpStatus,
    QueryKey,
    QueryOptions,
    RequestParams,
} from '../../types';

class Loader {
    constructor(
        private readonly baseLink: string,
        private readonly options: Readonly<QueryOptions>
    ) {}

    protected getResp<T>(
        { endpoint, options = {} }: RequestParams,
        callback: Callback<T> = (): void => {
            console.error('No callback for GET response');
        },
        onError: ErrorCallback = (message: string): void => console.error(message)
    ): void {
        this.load<T>(HttpMethod.Get, endpoint, callback, onError, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (
                res.status === HttpStatus.Unauthorized ||
                res.status === HttpStatus.NotFound ||
                res.status === HttpStatus.TooManyRequests
            )
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText || `HTTP ${res.status}`);
        }

        return res;
    }

    private makeUrl(options: QueryOptions, endpoint: Endpoint): string {
        const urlOptions: QueryOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        (Object.keys(urlOptions) as QueryKey[]).forEach((key) => {
            const value = urlOptions[key];
            if (value) url += `${key}=${encodeURIComponent(value)}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: HttpMethod,
        endpoint: Endpoint,
        callback: Callback<T>,
        onError: ErrorCallback,
        options: QueryOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response) => this.errorHandler(res))
            .then((res: Response) => res.json() as Promise<T>)
            .then((data: T) => callback(data))
            .catch((err: unknown) => {
                console.error(err);
                onError(err instanceof Error ? err.message : String(err));
            });
    }
}

export default Loader;
