import type { IComponent } from "../src/component"

export function renderElement(element: IComponent): void {
    document.body.innerHTML = `<div id="app"></div>`

    element.render(document.getElementById("app")!)
}
