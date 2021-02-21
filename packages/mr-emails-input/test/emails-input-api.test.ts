import { fireEvent, screen } from "@testing-library/dom"

import { selectors as emailsInputSelectors } from "../src/emails-input"
import { selectors as emailEditorSelectors } from "../src/email-editor"
import { render } from ".."

describe("Public API", () => {
    beforeEach(() => {
        document.body.innerHTML = `<div id="app"></div>`
    })

    it("Should render without crashing", () => {
        render(document.getElementById("app")!)

        expect(document.querySelector(`.${emailsInputSelectors.root}`)).toBeInTheDocument()
    })

    it("Should expose public functions", () => {
        const input = render(document.getElementById("app")!)

        expect(input).toHaveProperty("value")
        expect(input).toHaveProperty("getAll")
        expect(input).toHaveProperty("getValid")
        expect(input).toHaveProperty("add")
        expect(input).toHaveProperty("remove")
        expect(input).toHaveProperty("destroy")

        expect(input.getAll()).toEqual([])

        const validEmail = "test@mail.com"
        const invalidEmail = "test@"

        input.add(validEmail)
        expect(input.getAll()).toEqual([validEmail])
        expect(input.getValid()).toEqual([validEmail])
        expect(screen.getByText(validEmail)).toBeVisible()

        input.add(invalidEmail)
        expect(input.getAll()).toEqual([validEmail, invalidEmail])
        expect(input.getValid()).toEqual([validEmail])
        expect(screen.getByText(validEmail)).toBeVisible()
        expect(screen.getByText(invalidEmail)).toBeVisible()

        input.remove(invalidEmail)
        expect(input.getAll()).toEqual([validEmail])
        expect(screen.getByText(validEmail)).toBeVisible()
        expect(screen.queryByText(invalidEmail)).not.toBeInTheDocument()

        input.destroy()
        expect(document.querySelector(`.${emailsInputSelectors.root}`)).not.toBeInTheDocument()
    })

    it("Should submit new emails after typing comma", async () => {
        render(document.getElementById("app")!)

        const $editor = document.querySelector(`.${emailEditorSelectors.root}`)

        expect($editor).toBeInTheDocument()

        fireEvent.input($editor!, { target: { value: "t@t," } })

        expect(screen.getByText("t@t")).toBeVisible()
    })

    it("Should submit new emails after pressing enter", async () => {
        render(document.getElementById("app")!)

        const $editor = document.querySelector(`.${emailEditorSelectors.root}`)

        expect($editor).toBeInTheDocument()

        const email = "test"

        fireEvent.input($editor!, { target: { value: email } })
        fireEvent.keyDown($editor!, { key: "Enter" })

        expect(screen.getByText(email)).toBeVisible()
    })

    it("Should submit new emails after clipboard paste", async () => {
        render(document.getElementById("app")!)

        const $editor = document.querySelector(`.${emailEditorSelectors.root}`)

        expect($editor).toBeInTheDocument()

        const pasteData = "1@mail,2@mail"

        fireEvent.paste($editor!, { clipboardData: { getData: () => pasteData } })

        for (const email of pasteData.split(",")) {
            expect(screen.getByText(email)).toBeVisible()
        }
    })

    it("Should submit new emails after loosing focus", async () => {
        render(document.getElementById("app")!)

        const $editor = document.querySelector(`.${emailEditorSelectors.root}`)

        expect($editor).toBeInTheDocument()

        const email = "test"

        fireEvent.input($editor!, { target: { value: email } })
        fireEvent.blur($editor!)

        expect(screen.getByText(email)).toBeVisible()
    })
})
