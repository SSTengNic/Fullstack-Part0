import patientEntries from '../data/patients';
import {Patient, patientExcludeSsn} from '../types/Patient';
import { v4 as uuidv4 } from 'uuid';


const excludePatientSsn =(): Omit<Patient, 'ssn'>[] => { //type is in the omit, acts as the filter.
   return patientEntries.map(({id, name,occupation, gender, dateOfBirth})=>({
    id,
    name,
    occupation,
    gender,
    dateOfBirth
   })); //returns the FILTERED seeded data. This can be done because we using typescript, and not json for the datta.
};// very complicated reason why I have to use .map. Read Chapter 9, part 4, Utility types, its somewhere there.

const addPatient =( entry: Omit<patientExcludeSsn, 'id'>): Patient=> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const id = uuidv4();

    const newPatientEntry = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: id,
        ...entry
    };

    return newPatientEntry;


};

export default {
    excludePatientSsn,
    addPatient
};