// ---------- enums ----------

export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export enum ResponseStatus {
    Ok = 'ok',
    Error = 'error',
}

export enum HttpStatus {
    Unauthorized = 401,
    NotFound = 404,
    TooManyRequests = 429,
}

export enum HttpMethod {
    Get = 'GET',
    Post = 'POST',
}

// ---------- News API data ----------

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

/** Article has only a short version of the source: id (may be null) and name */
export type ArticleSource = Pick<Source, 'name'> & { id: string | null };

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

interface BaseResponse {
    status: ResponseStatus;
}

export interface SourcesResponse extends BaseResponse {
    sources: Source[];
}

export interface NewsResponse extends BaseResponse {
    totalResults: number;
    articles: Article[];
}

// ---------- request ----------

export type QueryKey = 'apiKey' | 'sources' | 'q' | 'language' | 'pageSize';

export type QueryOptions = Partial<Record<QueryKey, string>>;

export interface RequestParams {
    endpoint: Endpoint;
    options?: QueryOptions;
}

// ---------- functions ----------

export type Callback<T> = (data: T) => void;

export type ErrorCallback = (message: string) => void;
