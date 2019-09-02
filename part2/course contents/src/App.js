import React from 'react'
import Course from './Components/Course'

const App = ({ course }) => {
  
    return (
      <div>
        <h1>Web dev curriculum</h1>
        <Course course={course} />
      </div>
    )
  }

export default App