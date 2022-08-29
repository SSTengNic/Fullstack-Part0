import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/patientEntryValidation';
import toNewEntry from '../utils/newEntryValidation';

const router = express.Router();

router.get('/',(_,res)=>{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    res.send(patientService.PublicEntry());
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

router.get('/:id', (req,res)=>{

  
  try{
    const newPatientEntry = patientService.IdEntry((req.params.id));
    console.log('going through here');
    res.send(newPatientEntry);

  } catch(error: unknown){
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id/entries', (req,res)=> {
  console.log('testing 1234');
  try{
    const NewPatientEntry = patientService.IdEntry(req.params.id);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    res.send(NewPatientEntry);

  }catch(error: unknown){
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req,res)=> {

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewEntry(req.body);
    console.log('G. posting entry, newEntry is: ', newEntry);
    const patienttoAddEntry = patientService.IdEntry(req.params.id);

    const addEntry = patientService.addedEntry(patienttoAddEntry, newEntry);
    res.json(addEntry);

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