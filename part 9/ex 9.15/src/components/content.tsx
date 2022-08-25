import { CoursePart } from "../types/CourseParts"
import Part from './Part'


const Content =({courseparts}: {courseparts: Array<CoursePart>}):JSX.Element => {
  return (
    <div>
        {courseparts.map((part,i)=>
        <Part key = {i} part = {part}/>)
    }
    
    </div>
  )
}

export default Content;