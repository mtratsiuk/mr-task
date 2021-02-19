import { Component } from "./component"
import { css } from "./styles"

const selectors = {
    root: "mr-emails-input",
}

css(`
    .${selectors.root} {
        color: red
    }
`)

export class EmailsInput extends Component {
    name = "emails-input"

    onMount(): void {
        console.log(this.ref)
    }

    onUnmount(): void {
        console.log(this.ref)
    }

    view(): string {
        return `
            <div ${this.ref.create()} class="${selectors.root}">
                hello emails input container
            </div>
        `
    }
}
