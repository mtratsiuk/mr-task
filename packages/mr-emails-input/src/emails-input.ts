import { Component } from "./component"
import { css } from "./styles"
import { colors } from "./theme"

import { EmailLabel } from "./email-label"

export const selectors = {
    root: "mr-emails-input",
}

export class EmailsInput extends Component {
    name = "emails-input"
    label = new EmailLabel({
        value: "mi sha@gmail.com",
        onRemove: console.log,
    })

    onMount(): void {
        console.log(this)
        this.label.mount()
    }

    onUnmount(): void {
        console.log(this)
    }

    view(): string {
        return `
            <div ${this.ref.create()} class="${selectors.root}">
                ${this.label.view()}
                ${this.label.view()}
                ${this.label.view()}
                ${this.label.view()}
                ${this.label.view()}
                ${this.label.view()}
                ${this.label.view()}
                ${this.label.view()}
                ${this.label.view()}
                ${this.label.view()}
            </div>
        `
    }
}

css(`
    .${selectors.root} {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: flex-start;

        width: 100%;
        height: 100%;
        padding: 8px;

        overflow-y: auto;

        background: ${colors.background};
        border: 1px solid ${colors.textSeconday};
        box-sizing: border-box;
        border-radius: 4px;

        font-size: 14px;
    }

    .${selectors.root} *,
    .${selectors.root} *::before,
    .${selectors.root} *::after, {
        box-sizing: inherit;
    }

    .${selectors.root} > * {
        margin-bottom: 4px;
    }

    .${selectors.root} > :not(:last-child) {
        margin-right: 8px;
    }
`)
