import axios from "axios"

const getAddressByCep = (
    cep: string,
    setStreet: (street: string) => void,
    setNeighborhood: (neighborhood: string) => void,
    setCity: (city: string) => void,
    setState: (state: string) => void,
    setError: (error: string) => void
) => {
    axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            const data = response.data;
            if (data.erro) {
                setError('CEP não encontrado.');
                setStreet('');
                setNeighborhood('');
                setCity('');
                setState('');
            } else {
                setStreet(data.logradouro);
                setNeighborhood(data.bairro);
                setCity(data.localidade);
                setState(data.uf);
                setError('');
            }
        })
        .catch(error => {
            console.error('Erro ao obter endereço pelo CEP:', error);
            setError('Erro ao obter endereço pelo CEP.');
        });
};

export default getAddressByCep