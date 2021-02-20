import { Component } from "./component"
import { css } from "./styles"
import { colors } from "./theme"
import { keyCodes, isKeyPressed, getPasteInput } from "./utils"

export const PLACEHOLDER_TEXT = "add more people…"
export const SUBMIT_ON_KEYS = [keyCodes.Enter]
export const SUBMIT_ON_CHARS = [","]
export const SPLIT_CHARS_REGEXP = new RegExp(`[${SUBMIT_ON_CHARS.join("")}]`)

export const selectors = {
    root: "mr-email-editor",
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type EmailEditorProps = {}

export class EmailEditor extends Component<HTMLInputElement> {
    constructor({}: EmailEditorProps) {
        super()
    }

    get value(): string | undefined {
        return this.ref.current?.value
    }

    onMount(): void {
        this.ref.current?.addEventListener("paste", this._handlePaste)
        this.ref.current?.addEventListener("input", this._handleInput)
        this.ref.current?.addEventListener("blur", this._handleBlur)
        this.ref.current?.addEventListener("keydown", this._handleKeydown)
    }

    onUnmount(): void {
        this.ref.current?.removeEventListener("paste", this._handlePaste)
        this.ref.current?.removeEventListener("input", this._handleInput)
        this.ref.current?.removeEventListener("blur", this._handleBlur)
        this.ref.current?.removeEventListener("keydown", this._handleKeydown)
    }

    _handlePaste = (event: ClipboardEvent): void => {
        event.preventDefault()

        const input = getPasteInput(event)

        if (!input) {
            return
        }

        this._submit(input.split(SPLIT_CHARS_REGEXP))
    }

    _handleInput = (): void => {
        const value = this.value

        if (!value) {
            return
        }

        const inputChar = value[value.length - 1]

        if (SUBMIT_ON_CHARS.some((char) => inputChar === char)) {
            this._submit(value.slice(0, value.length - 1))
        }
    }

    _handleBlur = (): void => {
        this._submit(this.value)
    }

    _handleKeydown = (event: KeyboardEvent): void => {
        if (SUBMIT_ON_KEYS.some((key) => isKeyPressed(event, key))) {
            this._submit(this.value)
        }
    }

    _submit(email: string | string[] | undefined): void {
        if (!email) {
            return
        }

        if (this.ref.current) {
            this.ref.current.value = ""
        }

        const emails = Array.isArray(email) ? email : [email]

        for (const value of emails) {
            console.log(value.trim())
        }
    }

    view(): string {
        return `
            <input
              ${this.ref.create()}
              type="text"
              placeholder="${PLACEHOLDER_TEXT}"
              class="${selectors.root}"
            />
        `
    }
}

css(`
    .${selectors.root} {
        display: block;
        height: 25px;
        min-width: 220px;
        padding: 5px 9px;

        background-color: ${colors.background};
        border: none;
        outline: none;
    }

    .${selectors.root}::placeholder {
        color: ${colors.textSecondary}
    }
`)
