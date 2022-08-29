import { Entry } from "../types";
import DisplayCodeDetails from './DisplayCodeDetails';


export const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const entryStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };


const DisplayEntryDetails = ({entry}: {entry: Entry}) => { //please find out why {entry}: {entry:Entry} works to solve type {} is not aassinable to type "intrinsicAttributes"
  console.log('testing');
  switch(entry.type){
    case "Hospital":
        return (
            <div style = {entryStyle}>
              <em>{entry.date}, {entry.description}</em>
              <ul>
                {entry.diagnosisCodes?.map((code)=>
                  // eslint-disable-next-line react/jsx-key
                <DisplayCodeDetails key = {code} code = {code}/>
            )
            }
            </ul>
              <p>
                Diagnosed by {entry.specialist}
              </p>
            </div>
        );
    case "OccupationalHealthcare":
      return (//how do i fix the spacing for the list????
        <div style = {entryStyle}>
            <em>{entry.date} {entry.description}</em>

            {entry.diagnosisCodes?.map((code)=>
                  // eslint-disable-next-line react/jsx-key
              <li>
                <DisplayCodeDetails key = {code} code = {code}/>
              </li>
            )
            }
            <p>
              Diagnosed by {entry.specialist}
            </p>
            <p>
              Employer: {entry.employerName}
            </p>
            <p>
              Sick Leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
            </p>
                    
        </div>
    );
    case "HealthCheck":
      return(
        <div style = {entryStyle}>
            <em>{entry.date} {entry.description}</em>
      
            {entry.diagnosisCodes?.map((code)=>
                  // eslint-disable-next-line react/jsx-key
              <li>
                <DisplayCodeDetails key = {code} code = {code}/>
              </li>
            )
            }
        <p>
          Healthcheck Rating: {entry.healthCheckRating}
        </p>
        </div>
    );
    default:
        return assertNever(entry);

  }
};

export default DisplayEntryDetails;