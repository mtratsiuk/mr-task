const EMAIL_REGEXP = /^[^\s]+@[^\s]+$/

export function isValidEmail(value: string): boolean {
    return EMAIL_REGEXP.test(value)
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop(): void {}

export const keyCodes: Record<string, { key: string; code: number }> = {
    Enter: { key: "Enter", code: 13 },
}

export function isKeyPressed(event: KeyboardEvent, { key, code }: typeof keyCodes["key"]): boolean {
    return event.key === key || event.keyCode === code
}

export function getPasteInput(event: ClipboardEvent): string | undefined {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (event.clipboardData || (window as any)?.clipboardData)?.getData("text")
}

const htmlEscapes: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
}

const htmlEscapesRegexp = /[&<>"']/g

export function escape(value: string): string {
    return value && value.replace(htmlEscapesRegexp, (char) => htmlEscapes[char])
}
