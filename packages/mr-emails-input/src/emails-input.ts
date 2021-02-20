import { Component } from "./component"
import { css } from "./styles"
import { colors } from "./theme"

import { EmailLabel } from "./email-label"
import { EmailEditor } from "./email-editor"

export const selectors = {
    root: "mr-emails-input",
}

export class EmailsInput extends Component<HTMLDivElement> {
    _handleEmailSubmit = (value: string): void => {
        this.addEmail(value)
    }

    _handleEmailRemove = (value: EmailLabel): void => {
        this._removeLabel(value)
    }

    _editor = new EmailEditor({ onSubmit: this._handleEmailSubmit })
    _labels: EmailLabel[] = []

    get value(): string[] {
        return this._labels.map(({ value }) => value)
    }

    get state(): { value: string; isValid: boolean }[] {
        return this._labels.map(({ value, isValid }) => ({ value, isValid }))
    }

    addEmail(email: string): void {
        const renderTarget = this._editor.ref.current

        if (!renderTarget) {
            throw new Error("Cannot render `EmailLabel:` `EmailEditor` is not found")
        }

        const label = new EmailLabel({
            value: email,
            onRemove: this._handleEmailRemove,
        })

        label.render(renderTarget, "beforebegin")

        this._labels.push(label)
    }

    removeEmail(email: string): void {
        for (const label of this._labels) {
            if (label.value === email) {
                this._removeLabel(label)
            }
        }
    }

    onMount(): void {
        this._editor.mount()
    }

    onUnmount(): void {
        this._editor.unmount()

        for (const label of this._labels) {
            label.unmount()
        }
    }

    _removeLabel(labelToRemove: EmailLabel): void {
        this._labels = this._labels.filter((label) => label !== labelToRemove)

        labelToRemove.remove()
    }

    view(): string {
        return `
            <div
                ${this.ref.create()}
                class="${selectors.root}"
            >
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
