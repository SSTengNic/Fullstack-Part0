import { newEntry, BaseEntry, HealthCheckRating, Discharge, SickLeave } from "../types/Patient";
import diagnoseService from '../services/diagnosesService';

export const assertNever = (value: unknown): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  

const isString = (text: unknown): text is string => { 
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isaCode = (diagnoseCodes: Array<string>): boolean => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const codesforDiagnosis = diagnoseService.getEntries().map((entry)=>{
        return entry.code;
    });
    console.log('diagnoseCodes is: ', diagnoseCodes);
    console.log('"codesforDiagnosis is: ', codesforDiagnosis);

    const checker = diagnoseCodes.every((code)=> codesforDiagnosis.includes(code));
    
    return checker;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
    }
    return description;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist: ' + specialist);
    }
    return specialist;
};

const parseDiagnoseCodes = (diagnosisCodes: Array<string>): Array<string> => {
    if (!diagnosisCodes || !isaCode(diagnosisCodes)){
        throw new Error('Incorrect or missing diagnose codes: ' + diagnosisCodes);
    }
    return diagnosisCodes;
};


const parseEmployerName = (employername: unknown): string => {
    if (!employername || !isString(employername)){
        throw new Error('Incorrect or missing employer name: ' + employername);
    }
      return employername;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (healthCheckRating: any): healthCheckRating is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(healthCheckRating);
  };

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)){
        throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
    }

    return healthCheckRating;
    };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (discharge: any): Discharge => {
    if (!discharge) {
        throw new Error('Incorrect or missing discharge input: ' + discharge);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    else if (!discharge.date || !isDate(discharge.date)){
        throw new Error('Incorrect or missing discharge dates: ' + discharge.date);
    }
    else if (!discharge.criteria || !isString(discharge.criteria)){
        throw new Error('Incorrect or missing discharge criteria: ' + discharge.criteria);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return discharge;
};

const parseSickleave = (sickLeave: SickLeave): SickLeave => {
    if (!sickLeave){
        throw new Error('Incorrect or missing sick leave input');
    }
    
    else if (!isDate(sickLeave.startDate)) {
        throw new Error('Incorrect or missing starting date: ' + sickLeave.startDate);
    }
    else if (!isDate(sickLeave.endDate)){
        throw new Error('Incorrect or missing end date: ' + sickLeave.endDate);
    }
    return sickLeave;
};


type Fields = {date: unknown, description: unknown, specialist: unknown, diagnosisCodes: Array<string>, type: unknown, employername?: unknown, healthCheckRating?: unknown, discharge?: unknown, sickLeave: SickLeave};

const toNewEntry = ({date, description, specialist, diagnosisCodes, type, employername, healthCheckRating, discharge, sickLeave}: Fields): newEntry=> {
  const baseEntry: Omit<BaseEntry, "id"> = {
    date: parseDate(date),
    description: parseDescription(description), 
    specialist: parseSpecialist(specialist), //same as description for now
    diagnosisCodes: parseDiagnoseCodes(diagnosisCodes)
  };

  switch(type) {
    case "Hospital":
        return {
            ...baseEntry,
            type: "Hospital",
            discharge: parseDischarge(discharge)
        };
    case "OccupationalHealthcareEntry":
        return {
            ...baseEntry,
            type: "OccupationalHealthcare",
            employerName: parseEmployerName(employername),
            sickLeave: parseSickleave(sickLeave)
        };
    case "HealthcheckEntry":
        return {
            ...baseEntry,
            type: "HealthCheck",
            healthCheckRating: parseHealthCheckRating (healthCheckRating)
        };
    default:
        return assertNever(type);
  }


};
    export default toNewEntry;