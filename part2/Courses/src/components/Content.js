import React from "react"

const Content = ({ content }) => {
    const rows = () => content.map((item, i) => {
        const total = item.parts.reduce((a, b) => {
            return a + b.exercises
        }, 0)

        const xoxo = () => item.parts.map(item => {
            return (
                <li key={item.id}>{item.name} {item.exercises}</li>
            )
        })

        return (
            <div key={item.parts[i].id}>
                <h2>{item.name}</h2>
                <ul>
                    {xoxo()}
                </ul>
                <p style={{ fontWeight: "bold" }}>Total of {total} exercises</p>
            </div>
        )
    })

    return (
        <div>
            {rows()}
        </div>
    )
}

export default Content