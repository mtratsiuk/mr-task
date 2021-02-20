import { isValidEmail } from "../src/utils"

describe("#isValidEmail", () => {
    it.each([
        ["", false],
        [" ", false],
        [null, false],
        [undefined, false],
        [42, false],
        ["  @gmail.com", false],
        ["@gmail.com", false],
        ["misha@ ", false],
        ["misha@", false],
        ["@", false],
        ["mi sha@gmail.com", false],
        ["misha@gmail.com", true],
    ])("isValidEmail(%p) === %p", (email, expected) => {
        expect(isValidEmail(email as string)).toBe(expected)
    })
})
