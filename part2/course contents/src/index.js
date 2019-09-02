import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const App = () => {
  const course = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web dev curriculum</h1>
      <Course course={course} />
    </div>
  )
}

const Course = (props) => {

  const course = () => props.course.map(course =>
    <div key={course.id}>
      <Header courseTitle={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>)

  return (
    <>
      {course()}
    </>
  )
}

const Header = (props) => {
  return (
    <>
      <h2>{props.courseTitle}</h2>
    </>
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
      <p id="total">Total number of exercises: {totalSum}</p>
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root'))