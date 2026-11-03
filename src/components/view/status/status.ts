import { ViewState } from '../../../types';
import { getElement } from '../../../utils/dom';

class Status {
    private readonly element: HTMLElement;

    private readonly messages: Readonly<Record<ViewState, string>> = {
        [ViewState.Idle]: 'Pick any source on the left to read its latest news.',
        [ViewState.Loading]: 'Loading news',
        [ViewState.Ready]: '',
        [ViewState.Empty]: 'This source has no news right now. Try another one.',
        [ViewState.Error]: 'Something went wrong. Please try again later.',
    };

    constructor() {
        this.element = getElement('.status');
    }

    public set(state: ViewState, details?: string): void {
        const message = this.messages[state];

        this.element.className = `status ${state}`;
        this.element.textContent = details ? `${message} (${details})` : message;
        this.element.classList.toggle('hidden', state === ViewState.Ready);
    }
}

export default Status;
