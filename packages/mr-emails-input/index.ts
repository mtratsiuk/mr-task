import { EmailsInputApi } from "./src/emails-input-api"

export function render(node: HTMLElement): EmailsInputApi {
    return new EmailsInputApi(node)
}
