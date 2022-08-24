import { CourseParts } from "../types/CourseParts"

const CourseMap =({part}: {part: CourseParts}) => {
    return(
    <div>
        <p>
        {part.name} {part.exerciseCount}
        </p>
        </div>
    )
}

const Content =({courseparts}: {courseparts: Array<CourseParts>}):JSX.Element => {
  return (
    <div>
        {courseparts.map((part,i)=>
        <CourseMap key = {i} part = {part}/>)
    }
    
    </div>
  )
}

export default Content;