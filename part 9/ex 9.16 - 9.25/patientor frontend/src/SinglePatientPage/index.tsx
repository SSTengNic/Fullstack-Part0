import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { addEntry, useStateValue } from "../state";
import {Patient, Entry} from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import DisplayEntryDetails from "./DisplayEntryDetails"; 
import AddEntryModal from '../AddEntryModal/index';
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import React from "react";
import { Button} from "@material-ui/core";



const DisplayIcon = (gender:string)=> {
  if (gender === 'male'){
    return <MaleIcon/>;
  }
  return <FemaleIcon/>;

};

const SinglePatientPage = ()=> {
  const [, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);


  const openModal = (): void => setModalOpen(true);
  const [error, setError] = React.useState<string>();

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams<{ id: string }>();
  const [{ patients }] = useStateValue();

  const patientz = Object.values(patients).find(
      (patient: Patient) => patient.id === id
    );

  const submitNewEntry = async (values: EntryFormValues) => {

    const entry = {...values, type: "Hospital"};

    try {
      const { data: newEntry } = await axios.post<Patient>(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${apiBaseUrl}/patients/${id}/entries`,
        entry
      );
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

    return (
        <div>
         <h2>{patientz?.name}  {DisplayIcon(String(patientz?.gender))}</h2>
         <p>
            ssh: {patientz?.ssn}
         </p>
         <p>
            occupation: {patientz?.occupation}
         </p>
         <p>
         {patientz?.entries && patientz.entries?.length > 0}
          <b>entries</b>
          {patientz?.entries?.map((entry: Entry) => 
            <DisplayEntryDetails key = {entry.id} entry = {entry}/>
          )}
         </p>
         <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />

         <Button variant="contained" onClick={() => openModal()}>
            Add New Entry
          </Button>

        </div>
    );
};

export default SinglePatientPage;