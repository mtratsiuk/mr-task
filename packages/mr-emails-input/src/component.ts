export type IComponent<T extends Element> = {
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

    ref: IRef<T> = new Ref(this)

    render(node: Element): void {
        node.innerHTML = this.view()
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

let refId = 0

export class Ref<T extends Element> implements IRef<T> {
    component: IComponent<T>
    id: string | null
    current: T | null

    constructor(component: IComponent<T>) {
        this.component = component
        this.id = null
        this.current = null
    }

    create(): string {
        this.id = `data-mr-ref-${this.component.name}-${refId++}`
        return this.id
    }

    mount(): void {
        if (!this.id) {
            throw new Error("Cannot mount ref. Make sure to call ref.create() first")
        }

        this.current = document.querySelector(`[${this.id}]`)
    }
}
