const emailRegexp = /^[^\s]+@[^\s]+$/

export function isValidEmail(value: string): boolean {
    return emailRegexp.test(value)
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop(): void {}
