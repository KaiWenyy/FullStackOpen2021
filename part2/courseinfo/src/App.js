import React from 'react';

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}
const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Total = ({ course }) => {
  const ex = course.parts.map(part=>part.exercises)
  console.log(ex)
  const sum = ex.reduce((a,b)=>a+b)
  console.log(sum)

  /*const total = ex.reduce((s, p) => {
    console.log('what is happening', s, p)
    return s+p 
  })*/
  //course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  return(
    <p>total of {sum} exercises</p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (  
    <div>
      {course.parts.map(part=> <Part key={part.id} part={part} />)}
    </div>
  )
}

const App = () => {
  const courses = [
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
      <h1>Web Development Curriculum</h1>
      {courses.map(course=> <Course key={course.id} course={course} />)}
    </div>
  )
}
export default App