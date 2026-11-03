/**
 * Typed querySelector that never returns null.
 * Throws if the element is missing, so the rest of the code can rely on it.
 */
export function getElement<T extends Element = HTMLElement>(selector: string, parent: ParentNode = document): T {
    const element = parent.querySelector<T>(selector);

    if (!element) {
        throw new Error(`Element "${selector}" was not found`);
    }

    return element;
}

/** Clones the content of a <template> element */
export function cloneTemplate(template: HTMLTemplateElement): DocumentFragment {
    return document.importNode(template.content, true);
}
