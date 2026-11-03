import News from './news/news';
import Sources from './sources/sources';
import { NewsResponse, SourcesResponse } from '../../types';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Partial<NewsResponse>): void {
        const values = data.articles ?? [];
        this.news.draw(values);
    }

    public drawSources(data: Partial<SourcesResponse>): void {
        const values = data.sources ?? [];
        this.sources.draw(values);
    }
}

export default AppView;
