let rules = ""
let isLoaded = false

export function css(value: string): void {
    rules += value
}

export function loadStyles(): void {
    if (isLoaded) {
        return
    }

    isLoaded = true

    const head = document.head
    const style = document.createElement("style")

    head.appendChild(style)

    style.appendChild(document.createTextNode(rules))
}
