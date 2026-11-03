import './news.css';
import { Article } from '../../../types';
import { cloneTemplate, getElement } from '../../../utils/dom';

const MAX_NEWS = 10;
const PLACEHOLDER_IMAGE = 'img/news_placeholder.svg';

class News {
    public draw(data: readonly Readonly<Article>[]): void {
        const news = data.length >= MAX_NEWS ? data.filter((_item, idx) => idx < MAX_NEWS) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = getElement<HTMLTemplateElement>('#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone = cloneTemplate(newsItemTemp);

            if (idx % 2) getElement('.news__item', newsClone).classList.add('alt');

            getElement('.news__meta-photo', newsClone).style.backgroundImage = `url(${
                item.urlToImage || PLACEHOLDER_IMAGE
            })`;
            getElement('.news__meta-author', newsClone).textContent = item.author || item.source.name;
            getElement('.news__meta-date', newsClone).textContent = News.formatDate(item.publishedAt);

            getElement('.news__description-title', newsClone).textContent = item.title;
            getElement('.news__description-source', newsClone).textContent = item.source.name;
            getElement('.news__description-content', newsClone).textContent = item.description;
            getElement<HTMLAnchorElement>('.news__read-more a', newsClone).href = item.url;

            fragment.append(newsClone);
        });

        const newsContainer = getElement('.news');
        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }

    /** 2024-02-15T10:00:00Z -> 15-02-2024 */
    private static formatDate(isoDate: string): string {
        return isoDate.slice(0, 10).split('-').reverse().join('-');
    }
}

export default News;
