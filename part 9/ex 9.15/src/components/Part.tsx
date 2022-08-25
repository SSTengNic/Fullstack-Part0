import { courseParts } from "../App";
import { CoursePart } from "../types/CourseParts";


const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
const Part =({part}: {part: CoursePart})=> {

    switch(part.type) {
        case "normal":
            return (
            <div>
              <b>
                {part.name} {part.exerciseCount}
              </b>
              <div>
                <em>
                {part.description}
                </em>
              </div>
              <p>
              </p>
            </div>
            )
        case "groupProject":
            return(
                <div>
                  <b>
                    {part.name} {part.exerciseCount}
                  </b>
                  <div>
                      <em>
                    project exercises {part.groupProjectCount}
                      </em>
                  </div>
                  <p>
                  </p>
                </div>
                
            )
        case "submission":
            console.log([])
            return (
                <div>
                  <b>
                    {part.name} {part.exerciseCount}
                  </b>
                  <div>
                    <em>
                      {part.description}
                    </em>
                  </div>
                  <div>
                    submit to {part.exerciseSubmissionLink}
                  </div>
                  <p></p>
                </div>
                )
        case "special":
            return(
                <div>
                    <b>
                    {part.name} {part.exerciseCount} 
                    </b>
                    <div>
                      <em>
                        {part.description}  
                      </em>
                    </div>
                    <div>
                      required skills: {part.requirements.join(', ')}
                   </div>
                   <p></p>
                </div>
            )
        default:
            return assertNever(part);
    }
};

export default Part;