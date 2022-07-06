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

export default Course
  