import { loadStyles } from "./styles"
import { EmailsInput } from "./emails-input"

export class EmailsInputApi {
    _input: EmailsInput

    constructor(node: Element) {
        loadStyles()

        this._input = new EmailsInput()

        this._input.render(node)
    }

    add(email: string): void {
        this._input.addEmail(email)
    }

    remove(email: string): void {
        this._input.removeEmail(email)
    }

    destroy(): void {
        this._input.remove()
    }
}
