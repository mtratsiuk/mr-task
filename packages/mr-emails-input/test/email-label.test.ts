import { fireEvent, screen } from "@testing-library/dom"

import { renderElement } from "./test-utils"
import { EmailLabel, selectors } from "../src/email-label"

describe("EmailLabel", () => {
    it("Should mount correctly", () => {
        const email = "misha@gmail.com"

        const label = new EmailLabel({ value: email })

        renderElement(label)

        expect(document.querySelector(`.${selectors.root}`)).toBeInTheDocument()
        expect(document.querySelector(`.${selectors.remove}`)).toBeInTheDocument()
        expect(screen.getByText(email)).toBeVisible()
    })

    it("Should handle invalid state", () => {
        document.body.innerHTML = `<div id="app"></div>`
        const email = "@gmail.com"

        const label = new EmailLabel({ value: email })

        renderElement(label)

        expect(document.querySelector(`.${selectors.root}`)).toHaveClass(selectors.invalid)
        expect(label).toHaveProperty("isValid", false)
    })

    it("Should expose public api", async () => {
        const email = "misha@gmail.com"
        const handleRemove = jest.fn()

        const label = new EmailLabel({ value: email, onRemove: handleRemove })

        renderElement(label)

        expect(label).toHaveProperty("value", email)
        expect(label).toHaveProperty("isValid", true)

        await fireEvent.click(document.querySelector(`.${selectors.remove}`)!)

        expect(handleRemove).toHaveBeenCalledTimes(1)
        expect(handleRemove).toHaveBeenCalledWith(label)
    })
})
