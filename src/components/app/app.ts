import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { getElement } from '../../utils/dom';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        getElement('.sources').addEventListener('click', (e: MouseEvent) => this.onSourceClick(e));

        getElement<HTMLInputElement>('.search').addEventListener('input', (e: Event) => {
            if (e.currentTarget instanceof HTMLInputElement) this.view.filterSources(e.currentTarget.value);
        });

        this.controller.getSources(
            (data) => this.view.drawSources(data),
            (message) => this.view.showError(message)
        );
    }

    private onSourceClick(e: MouseEvent): void {
        const sourceId = this.controller.getNews(
            e,
            (data) => this.view.drawNews(data),
            (message) => this.view.showError(message)
        );

        if (sourceId) this.view.selectSource(sourceId);
    }
}

export default App;
