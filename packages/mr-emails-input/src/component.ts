export type IComponent<T extends Element = Element> = {
    ref: IRef<T>
    render: (node: Element) => void
    mount: () => void
    unmount: () => void
    remove: () => void
}

export type IRef<T extends Element = Element> = {
    create: () => string
    mount: () => void
    current: T | null
}

export abstract class Component<T extends Element = Element> implements IComponent<T> {
    abstract onMount(): void
    abstract onUnmount(): void
    abstract view(): string

    ref: IRef<T> = new Ref()

    /**
     * Note: untrusted input is NOT automatically sanitized
     */
    render(node: Element, mode: InsertPosition = "beforeend"): void {
        const markup = this.view()
            .split("\n")
            .map((x) => x.trim())
            .filter(Boolean)
            .join(" ")

        node.insertAdjacentHTML(mode, markup)

        this.mount()
    }

    mount(): void {
        this.ref.mount()
        this.onMount()
    }

    unmount(): void {
        this.onUnmount()
    }

    remove(): void {
        this.unmount()
        this.ref.current?.parentElement?.removeChild(this.ref.current)
    }
}

const REF_ID_ATTR = "data-mr-ref"

export class Ref<T extends Element> implements IRef<T> {
    id: string | null
    current: T | null

    constructor() {
        this.id = null
        this.current = null
    }

    create(): string {
        this.id = getNextRefId()

        return `${REF_ID_ATTR}="${this.id}"`
    }

    mount(): void {
        if (!this.id) {
            throw new Error("Cannot mount ref. Make sure to call `ref.create()` first")
        }

        this.current = document.querySelector(`[${REF_ID_ATTR}="${this.id}"]`)
    }
}

let refId = (Math.random() * 100) >>> 0

function getNextRefId(): string {
    refId += 1

    return `${refId}.${(Math.random() * 1000) >>> 0}`
}
