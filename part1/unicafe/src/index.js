import React, { useState } from "react"
import ReactDOM from "react-dom"

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
    const [good, setGood] = useState(0),
        [neutral, setNeutral] = useState(0),
        [bad, setBad] = useState(0)

    const setGoodToValue = (newValue) => {
        setGood(newValue)
    }
    const setNeutralToValue = (newValue) => {
        setNeutral(newValue)
    }
    const setBadToValue = (newValue) => {
        setBad(newValue)
    }

    return (
        <div>
            <h1>Give feedback</h1>
            <Button handleClick={() => setGoodToValue(good + 1)} text="good" />
            <Button handleClick={() => setNeutralToValue(neutral + 1)} text="neutral" />
            <Button handleClick={() => setBadToValue(bad + 1)} text="bad" />
            <h3>Statistics</h3>
            <table style={{ width: "15%" }}>
                <tbody>
                    <tr>
                        <td>good</td>
                        <td> {good}</td>
                    </tr>
                    <tr>
                        <td>neutral</td>
                        <td> {neutral}</td>
                    </tr>
                    <tr>
                        <td>bad</td>
                        <td> {bad}</td>
                    </tr>
                    <tr>
                        <td>all </td>
                        <td>{good + neutral + bad}</td>
                    </tr>
                    <tr>
                        <td>average</td>
                        <td> {((good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)).toFixed(1) > 0 ? ((good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)).toFixed(1) : 0}</td>
                    </tr>
                    <tr>
                        <td>positive</td>
                        <td> {`${100 * (good / (good + neutral + bad))}` > 0 ? `${(100 * (good / (good + neutral + bad))).toFixed(1)}%` : "0%"}</td>
                    </tr>
                </tbody>
            </table>




        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))