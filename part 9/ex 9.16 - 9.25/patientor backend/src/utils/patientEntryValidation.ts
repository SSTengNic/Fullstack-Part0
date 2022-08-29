import {Patient,Gender, Entry} from '../types/Patient';

const isString = (text: unknown): text is string => { //type guard fcuntion, returns a boolean and which has a type predicate as return type??
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseStringType = (text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing information: ${text}`);
    }
    return text;
};


const parseGender = (gender: unknown): Gender => {
    if (!gender ||!isGender(gender)) {
        throw new Error('Incorrect or missing gender!');
    }
    return gender;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
    }
    return dateOfBirth;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseEntries = (entries: any): Entry[] => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return entries;
  }; //let everything parse through. entries is empty for now anyway.

type Fields = {name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown};

const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation, entries}: Fields): Omit<Patient, 'id'>=> {
  
    return {
        name: parseStringType(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseStringType(ssn),
        gender: parseGender(gender),
        occupation: parseStringType(occupation),
        entries: parseEntries(entries)
    }; //have to return it like so, since if i create a variable and then return it, ts will ask me to insert id, despite already omiting it, as explained in last exercise.

    };

export default toNewPatientEntry;