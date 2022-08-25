import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/patientEntryValidation';

const router = express.Router();

router.get('/',(_,res)=>{
    res.send(patientService.excludePatientSsn());
});

router.post('/',(req,res)=> {

  try{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown){
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});
 // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
 /*
 const newPatientEntry = patientService.addPatient(
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
 )
  */

export default router;