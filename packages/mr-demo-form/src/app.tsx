import React from "react"
import type EmailsInput from "@mr/emails-input/dist/index"

declare global {
    interface Window {
        mrEmailsInput: typeof EmailsInput
    }
}

export const App: React.FC = () => {
    const ref = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (!ref.current) {
            return
        }

        window.mrEmailsInput.render(ref.current)
    })

    return (
        <div className="App">
            <h3>hello demo form</h3>
            <div ref={ref}></div>
        </div>
    )
}
