import AppLoader from './appLoader';
import { Callback, Endpoint, ErrorCallback, NewsResponse, SourcesResponse } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: Callback<SourcesResponse>, onError?: ErrorCallback): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: Endpoint.Sources,
            },
            callback,
            onError
        );
    }

    /**
     * Loads news of the clicked source.
     * Returns id of the newly selected source or null if nothing new was selected.
     */
    public getNews(e: Event, callback: Callback<NewsResponse>, onError?: ErrorCallback): string | null {
        let target: EventTarget | null = e.target;
        const newsContainer = e.currentTarget;

        if (!(newsContainer instanceof HTMLElement)) return null;

        while (target instanceof HTMLElement && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<NewsResponse>(
                        {
                            endpoint: Endpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback,
                        onError
                    );
                    return sourceId;
                }
                return null;
            }
            target = target.parentElement;
        }

        return null;
    }
}

export default AppController;
