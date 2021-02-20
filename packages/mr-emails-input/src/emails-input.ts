import { Component } from "./component"
import { css } from "./styles"
import { colors } from "./theme"

import { EmailLabel } from "./email-label"
import { EmailEditor } from "./email-editor"

export const selectors = {
    root: "mr-emails-input",
}

export class EmailsInput extends Component {
    label = new EmailLabel({
        value: "misha@gmail.com",
        onRemove: console.log.bind(console),
    })

    _editor = new EmailEditor({})

    onMount(): void {
        console.log(this)
        this._editor.mount()
        this.label.mount()
    }

    onUnmount(): void {
        console.log(this)
        this._editor.unmount()
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
                ${this._editor.view()}
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
        border: 1px solid ${colors.textSecondary};
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

        flex: 0 0 auto;
    }

    .${selectors.root} > :last-child {
        flex: 1 0 auto;
    }
`)
