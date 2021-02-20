import { loadStyles } from "./styles"
import { EmailsInput } from "./emails-input"

/**
 * Provides API to initialize emails-input component
 * and access & update its state.
 *
 * ```js
 * const app = document.getElementById("root")
 * const emailsInput = window.mrEmailsInput.render(app)
 *
 * emailsInput.getAll() // ["user@some.mail", "invalid@"]
 * emailsInput.getValid() // ["user@some.mail"]
 *
 * emailsInput.add("new@some.mail")
 * emailsInput.remove("invalid@")
 *
 * emailsInput.destroy()
 * ```
 */
export class EmailsInputApi {
    private _input: EmailsInput

    /**
     * Renders component into provided node
     *
     * @param node - target element
     */
    constructor(node: Element) {
        loadStyles()

        this._input = new EmailsInput()

        this._input.render(node)
    }

    /**
     * Returns the list of all typed emails
     *
     * @alias EmailsInputApi.getAll
     */
    get value(): string[] {
        return this.getAll()
    }

    /**
     * Returns the list of all typed emails
     *
     * @alias EmailsInputApi.value
     */
    getAll(): string[] {
        return this._input.value
    }

    /**
     * Returns the list of all typed emails that are _valid_
     *
     * NOTE: Only simple email validation is performed
     */
    getValid(): string[] {
        return this._input.state.filter(({ isValid }) => isValid).map(({ value }) => value)
    }

    /**
     * Adds provided email to the input
     *
     * @param email - email to add
     */
    add(email: string): void {
        this._input.addEmail(email)
    }

    /**
     * Removes provided email from the input
     *
     * @param email - email to remove
     */
    remove(email: string): void {
        this._input.removeEmail(email)
    }

    /**
     * Destroys component and removes it from the DOM
     */
    destroy(): void {
        this._input.remove()
    }
}
