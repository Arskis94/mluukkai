import React from "react"

const Content = ({ content }) => {
    console.log(content)
    const Lines = () => {
        return content.map( (item, i) => <li key={item.parts[i].id}>{}</li>)
    }



    const rows = () => content.map((item, i) => {
        const total = item.parts.reduce((a, b) => {
            return a + b.exercises
        }, 0)
        return (
            <div>
                <h2>{item.name}</h2>
                <ul>
                    <Lines />
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