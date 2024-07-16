import axios from 'axios';

interface Coordinates {
    latitude: number;
    longitude: number;
}

type LocationError = string | null;

const requestLocationPermission = (
    setLocation: (location: Coordinates) => void,
    setError: (error: LocationError) => void,
    setAddress: (address: string) => void
) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log('Latitude:', latitude);
                console.log('Longitude:', longitude);
                setLocation({ latitude, longitude });

                axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                    .then(response => {
                        const data = response.data;
                        const address = `${data.address.road}, ${data.address.neighbourhood}, ${data.address.city} - ${data.address.state}, ${data.address.postcode}`;
                        setAddress(address);
                        console.log('Endereço:', address);
                    })
                    .catch(error => {
                        console.error('Erro ao obter endereço:', error);
                        setError('Erro ao obter endereço.');
                    });
            },
            (error) => {
                console.error('Erro ao obter localização:', error);
                setError('Erro ao obter localização. Verifique as configurações do navegador.');
            }
        );
    } else {
        setError('Geolocalização não é suportada pelo navegador.');
    }
};

export { requestLocationPermission };
