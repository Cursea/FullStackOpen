import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValue = (set, value) => () => {
    set(value + 1)
  }


  return (
    <div>
      <h1>
        feedback
      </h1>
      <Button onClick={setToValue(setGood, good)} text='good' />
      <Button onClick={setToValue(setNeutral, neutral)} text='neutral' />
      <Button onClick={setToValue(setBad, bad)} text='bad' />
      <h1>
        statistics
      </h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({ onClick, text }) => {

  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props

  if (good + neutral + bad === 0) {
    return (
      <p>
        No feedback given
      </p>
    )
  }

  return (
    <p style={{whiteSpace: 'pre'}}>
    {
`good: ${good} 
neutral: ${neutral}
bad: ${bad}
all: ${good + neutral + bad}
average: ${good - bad / (good + neutral + bad)}
positive: ${good / (good + neutral + bad) * 100 + '%'}`
    }
    </p>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)