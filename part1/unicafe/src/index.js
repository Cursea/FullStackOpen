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
    <div>
      <Statistic text="good" value={good} />
      <Statistic text="neurtal" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={good + neutral + bad} />
      <Statistic text="average" value={(good - bad) / (good + neutral + bad)} />
      <Statistic text="positive" value={good / (good + neutral + bad) * 100 + '%'} />
    </div>
  )
}

const Statistic = (props) => {
  return (
    <p>
      {props.text}: {props.value} 
    </p>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)