import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSE_LIST";
      payload: Diagnosis[];
    }
  | {
    type: "ADD_ENTRY";
    payload: Patient;
    };

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  };
};

export const setDiagnoseList = (diagnosis: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSE_LIST",
    payload: diagnosis,
  };
};

export const addEntry = (newEntry: Patient): Action => {
  return {
    type: "ADD_ENTRY",
    payload: newEntry
  };
};
    
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSE_LIST":
      return {
        ...state,
        diagnosis: action.payload
      };
    
    case "ADD_ENTRY":
      return {
        ...state,
        patient: action.payload,
        };
      
    default:
      return state;
  }
};
