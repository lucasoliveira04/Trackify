// util/handle-cep-change.ts
import { Dispatch, SetStateAction } from "react";
import getAddressByCep from "./get-addres-by-cep";


const handleCepChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setCep: Dispatch<SetStateAction<string>>,
    setStreet: Dispatch<SetStateAction<string>>,
    setNeighborhood: Dispatch<SetStateAction<string>>,
    setCity: Dispatch<SetStateAction<string>>,
    setState: Dispatch<SetStateAction<string>>,
    setError: Dispatch<SetStateAction<string>>
) => {
    const cepValue = event.target.value;
    setCep(cepValue);

    if (cepValue.length === 8) {
        getAddressByCep(cepValue, setStreet, setNeighborhood, setCity, setState, setError);
    } else {
        setStreet('');
        setNeighborhood('');
        setCity('');
        setState('');
    }
};

export default handleCepChange;
