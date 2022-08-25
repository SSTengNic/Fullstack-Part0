import { CoursePart } from "../types/CourseParts"


const Total =({courseparts}: {courseparts: Array<CoursePart>}):JSX.Element => {
    return (
      <div>
        Number of exercises {courseparts.reduce((carry, part)=>
          carry + part.exerciseCount,0)}
      </div>
    )
  }
  
  export default Total