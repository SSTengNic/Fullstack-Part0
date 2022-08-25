"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const excludePatientSsn = () => {
    return patients_1.default.map(({ id, name, occupation, gender, dateOfBirth }) => ({
        id,
        name,
        occupation,
        gender,
        dateOfBirth
    })); //returns the FILTERED seeded data. This can be done because we using typescript, and not json for the datta.
}; // very complicated reason why I have to use .map. Read Chapter 9, part 4, Utility types, its somewhere there.
const addPatient = (entry) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const id = (0, uuid_1.v4)();
    const newPatientEntry = Object.assign({ 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: id }, entry);
    return newPatientEntry;
};
exports.default = {
    excludePatientSsn,
    addPatient
};
