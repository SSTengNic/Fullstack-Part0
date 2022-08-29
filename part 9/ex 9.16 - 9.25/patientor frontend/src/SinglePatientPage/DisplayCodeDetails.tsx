import { useStateValue } from "../state";

const DisplayEntryDetails = ({code}: {code:string})=> { //I still dont know why "code: string" doesnt work, but "{code}: {code...}"" works.
    const [{ diagnosis}] = useStateValue(); 
    console.log('diagnoses is: ',  diagnosis);
    console.log('code is: ',code );

    const codeInfo = diagnosis.find((diagnose)=> diagnose.code === code);
    return (
        <li>
          {code} {codeInfo?.name}
        </li>
    );



};

export default DisplayEntryDetails;