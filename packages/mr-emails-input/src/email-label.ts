import { Component } from "./component"
import { css } from "./styles"
import { colors, icons } from "./theme"
import { isValidEmail, noop } from "./utils"

export const selectors = {
    root: "mr-email-label",
    invalid: "mr-email-label--invalid",
    remove: "mr-email-label__remove",
}

export type EmailLabelProps = {
    value: string
    onRemove?: (value: string) => void
}

export class EmailLabel extends Component {
    _value: string
    _onRemove: (value: string) => void
    _buttonRemove?: HTMLButtonElement | null

    constructor({ value, onRemove = noop }: EmailLabelProps) {
        super()
        this._value = value
        this._onRemove = onRemove
    }

    get value(): string {
        return this._value
    }

    get isValid(): boolean {
        return isValidEmail(this.value)
    }

    onMount(): void {
        this._buttonRemove = this.ref.current?.querySelector("button")
        this._buttonRemove?.addEventListener("click", this._handleRemove)
    }

    onUnmount(): void {
        this._buttonRemove?.removeEventListener("click", this._handleRemove)
    }

    _handleRemove = (): void => {
        this._onRemove(this.value)
    }

    view(): string {
        return `
            <div
                ${this.ref.create()}
                class="${selectors.root} ${this.isValid ? "" : selectors.invalid}"
            >
                <div>${this.value}</div>
                <button class="${selectors.remove}">
                  ${icons.remove}
                </button>
            </div>
        `
    }
}

css(`
    .${selectors.root} {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 25px;
        padding: 5px 9px;

        background-color: ${colors.highlight};
        border-radius: 100px;
    }

    .${selectors.invalid} {
        background-color: ${colors.background};
        border-bottom: 1px dashed ${colors.error};
        border-radius: 0px;
        padding: 5px 0px;
    }

    .${selectors.remove} {
        display: block;

        padding: 0;
        padding: 3px 3px 3px 8px;

        background: transparent;
        border: none;

        cursor: pointer;
    }

    .${selectors.remove}:focus {
        outline: 1px solid ${colors.textSecondary}
    }

    .${selectors.remove}:active,
    .${selectors.remove}:hover {
        outline: none;
    }
`)
