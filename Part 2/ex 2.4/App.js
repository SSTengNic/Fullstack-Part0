const BigHeader =({text}) => {
  return (
  <>
    <h1>
      {text}
    </h1>
  </>
  )
}

const LittleHeader =({name}) => {
  return (
  <>
    <h2>
      {name}
    </h2>
  </>
  )
}

const Parts =({parts})=> {
  return(
    <>
    <p>
      {parts.name} {parts.exercises}
    </p>
    </>
  )

}

const Content = ({name,parts})=> {
  return(
    <>
      <LittleHeader name = {name}/>
      {parts.map(parts => 
        <Parts key = {parts.id} parts = {parts}/>
      )}
      <Total parts={parts}/>
    </>
  )
}

const Total =({parts})=> {
  var total = parts.reduce(function(start,part)
   {
    return part.exercises+start
  },0)

  return(
    <>
    <b>
      total of {total} exercises
    </b>
    </>
  )
}

const Course = ({course})=> {
  return (
    <>
    {course.map(course =>
      <Content key = {course.id} name = {course.name} parts = {course.parts} /> //nested loop. practice more, difficult to see.
      )}
    </>
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
      <BigHeader text = "Web Development curriculum"/>
      <Course course = {courses}/>
    </div>
  )
}

export default App