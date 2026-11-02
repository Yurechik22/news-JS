declare module '*.css';

declare const process: {
    env: {
        readonly API_URL?: string;
        readonly API_KEY?: string;
    };
};
