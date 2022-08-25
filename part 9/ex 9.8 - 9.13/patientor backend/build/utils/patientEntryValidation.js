"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Patient_1 = require("../types/Patient");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Patient_1.Gender).includes(param);
};
const parseStringType = (text) => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing information: ${text}`);
    }
    return text;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender!');
    }
    return gender;
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
    }
    return dateOfBirth;
};
const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }) => {
    return {
        name: parseStringType(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseStringType(ssn),
        gender: parseGender(gender),
        occupation: parseStringType(occupation),
    }; //have to return it like so, since if i create a variable and then return it, ts will ask me to insert id, despite already omiting it, as explained in last exercise.
};
exports.default = toNewPatientEntry;
