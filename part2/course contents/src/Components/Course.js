import React from 'react'

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

export default Course