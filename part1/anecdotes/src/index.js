import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState({
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    })

    const setToValue = (set, max) => () => {
        set(Math.floor(Math.random() * (max + 1)))
    }

    const addPoints = (set, key) => () => {
        //spread the {points} object to copy the original (no mutattion), and adds 1 to the original value of the value at key place [key]
        return set({ ...points, [key]: points[key] + 1 })
    }

    const highestVote = (obj) =>
        Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b)

    console.log('selected: ', selected, ' points: ', points)

    return (
        <div>
            <h2>Anecdote of the day</h2>
            <p>{props.anecdotes[selected]}</p>
            <p>has <span id="votes">{points[selected]}</span> votes</p>
            <Button random={addPoints(setPoints, selected)} text='vote' />
            <Button random={setToValue(setSelected, anecdotes.length - 1)} text='next anecdote' />
            <h2>Anecdote with most votes</h2>
            <p>{anecdotes[highestVote(points)]}</p>
            <p>with <span id="highest">{points[highestVote(points)]}</span> votes</p>
        </div>
    )
}

const Button = ({ random, text }) =>
    <button onClick={random}>
        {text}
    </button>

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)