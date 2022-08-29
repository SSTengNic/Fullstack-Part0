import patientEntries from '../data/patients';
import {newEntry, Patient, PublicPatient} from '../types/Patient';
import { v4 as uuidv4 } from 'uuid';


const PublicEntry =(): PublicPatient[] => { //type is in the omit, acts as the filter.
   return patientEntries.map(({id, name,occupation, gender, dateOfBirth,entries,ssn})=>({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
    entries,
    ssn
   })); //returns the FILTERED seeded data. This can be done because we using typescript, and not json for the datta.
};// very complicated reason why I have to use .map. Read Chapter 9, part 4, Utility types, its somewhere there.

const IdEntry = (id: string): Patient | undefined=> {
  let returnPatient = patientEntries.find((patient)=>patient.id ===id);
  console.log('returnPatient is: ', returnPatient);
  if (returnPatient && !returnPatient?.entries){
  returnPatient = {
    ...returnPatient,
    entries: [],
  };
}
  return returnPatient;
};


const addPatient =( entry: Omit<Patient, 'id'>): Patient=> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const id = uuidv4();

    const newPatientEntry = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: id,
        ...entry
    };

    return newPatientEntry;
};

const addedEntry = (patient: Patient | undefined, newEntry: newEntry): Patient => {
    if (!patient){
        throw new Error('Incorrect or missing sick leave input');
    }
     const id = uuidv4();
     const pushEntry = {
        id: id,
        ...newEntry
     };
    
     patient?.entries?.push(pushEntry);

     return patient;
};

export default {
    PublicEntry,
    addPatient,
    IdEntry,
    addedEntry
};