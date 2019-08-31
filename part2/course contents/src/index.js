import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.courseTitle}</h1>
    </>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header courseTitle={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}

const Content = ({ parts }) => {

  const row = () => parts.map(part =>
    <Part part={part.name} exercises={part.exercises} key={part.id} />)

  return (
    <div>
      {row()}
    </div>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.part} {props.exercises}</p>
    </>
  )
}

const Total = ({ parts }) => {

  const totalSum = parts.reduce((acc, cur) => acc + cur.exercises, 0)

  return (
    <>
      <p>Total number of exercises: {totalSum}</p>
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root'))