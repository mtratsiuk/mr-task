import { loadStyles } from "./styles"
import { EmailsInput } from "./emails-input"

export class EmailsInputApi {
    _input: EmailsInput

    constructor(node: Element) {
        loadStyles()

        this._input = new EmailsInput()

        this._input.render(node)
    }

    remove(): void {
        this._input.remove()
    }
}
