export type IComponent<T extends Element = Element> = {
    name: string
    ref: IRef<T>
    render: (node: Element) => void
    mount: () => void
    remove: () => void
}

export type IRef<T extends Element = Element> = {
    create: () => string
    mount: () => void
    current: T | null
}

export abstract class Component<T extends Element = Element> implements IComponent<T> {
    abstract name: string
    abstract onMount(): void
    abstract onUnmount(): void
    abstract view(): string

    ref: IRef<T> = new Ref()

    render(node: Element): void {
        node.innerHTML = this.view()
            .split("\n")
            .map((x) => x.trim())
            .join("")

        this.mount()
    }

    mount(): void {
        this.ref.mount()
        this.onMount()
    }

    remove(): void {
        this.onUnmount()
        this.ref.current?.parentElement?.removeChild(this.ref.current)
    }
}

const RefIdAttr = "data-mr-ref"

export class Ref<T extends Element> implements IRef<T> {
    id: string | null
    current: T | null

    constructor() {
        this.id = null
        this.current = null
    }

    create(): string {
        this.id = getNextRefId()

        return `${RefIdAttr}="${this.id}"`
    }

    mount(): void {
        if (!this.id) {
            throw new Error("Cannot mount ref. Make sure to call ref.create() first")
        }

        this.current = document.querySelector(`[${RefIdAttr}="${this.id}"]`)
    }
}

let refId = (Math.random() * 100) >>> 0

function getNextRefId(): string {
    refId += 1

    return `${refId}.${(Math.random() * 1000) >>> 0}`
}
