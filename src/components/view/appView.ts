import News from './news/news';
import Sources from './sources/sources';
import Status from './status/status';
import { NewsResponse, SourcesResponse, ViewState } from '../../types';
import { getElement } from '../../utils/dom';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;
    private readonly status: Status;
    private readonly title: HTMLElement;
    private readonly sourcesCount: HTMLElement;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
        this.status = new Status();
        this.title = getElement('.content__title');
        this.sourcesCount = getElement('.sources-count');
        this.status.set(ViewState.Idle);
    }

    public drawNews(data: Partial<NewsResponse>): void {
        const values = data.articles ?? [];
        this.news.draw(values);
        this.status.set(values.length ? ViewState.Ready : ViewState.Empty);
    }

    public drawSources(data: Partial<SourcesResponse>): void {
        const values = data.sources ?? [];
        this.sources.draw(values);
        this.sourcesCount.textContent = String(values.length);
    }

    public selectSource(id: string): void {
        this.title.textContent = this.sources.setActive(id);
        this.news.clear();
        this.status.set(ViewState.Loading);
    }

    public filterSources(query: string): void {
        this.sources.filter(query);
    }

    public showError(message: string): void {
        this.status.set(ViewState.Error, message);
    }
}

export default AppView;
