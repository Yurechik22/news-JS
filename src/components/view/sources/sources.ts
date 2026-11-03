import './sources.css';
import { SourceCard } from '../../../types';
import { cloneTemplate, getElement } from '../../../utils/dom';

class Sources {
    private readonly container: HTMLElement;
    private readonly emptyMessage: HTMLElement;
    private items: readonly SourceCard[] = [];

    constructor() {
        this.container = getElement('.sources');
        this.emptyMessage = getElement('.sources__empty');
    }

    public draw(data: readonly SourceCard[]): void {
        this.items = data;

        const fragment = document.createDocumentFragment();
        const sourceItemTemp = getElement<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = cloneTemplate(sourceItemTemp);

            getElement('.source__item-name', sourceClone).textContent = item.name;
            getElement('.source__item-category', sourceClone).textContent = item.category;
            const button = getElement('.source__item', sourceClone);
            button.setAttribute('data-source-id', item.id);
            button.title = item.name;

            fragment.append(sourceClone);
        });

        this.container.append(fragment);
    }

    /** Shows only the sources whose name contains the query */
    public filter(query: string): void {
        const normalized = query.trim().toLowerCase();
        let visible = 0;

        this.getButtons().forEach((button) => {
            const name = (button.title || '').toLowerCase();
            const isVisible = name.includes(normalized);
            button.classList.toggle('hidden', !isVisible);
            if (isVisible) visible += 1;
        });

        this.emptyMessage.classList.toggle('hidden', visible > 0);
    }

    /** Highlights the chosen source and returns its name */
    public setActive(id: string): string {
        this.getButtons().forEach((button) => {
            button.classList.toggle('active', button.getAttribute('data-source-id') === id);
        });

        return this.items.find((item) => item.id === id)?.name ?? id;
    }

    private getButtons(): HTMLElement[] {
        return Array.from(this.container.querySelectorAll<HTMLElement>('.source__item'));
    }
}

export default Sources;
