let rules = ""
let isLoaded = false

export type Css = (value: string) => void
export const css: Css = (value) => (rules += value)

export type LoadStyles = () => void
export const loadStyles: LoadStyles = () => {
    if (isLoaded) {
        return
    }

    isLoaded = true

    const head = document.head
    const style = document.createElement("style")

    head.appendChild(style)

    style.appendChild(document.createTextNode(rules))
}
