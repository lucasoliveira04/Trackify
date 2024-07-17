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
                switch (error.code){
                    case error.PERMISSION_DENIED:
                        setError('Permissão para obter localização negada. Este site não funcionará corretamente sem acesso à localização em tempo real.');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        setError('Localização indisponível.');
                        break;
                    case error.TIMEOUT:
                        setError('Tempo para obter localização esgotado.');
                        break;
                    default:
                        setError('Erro desconhecido ao obter localização.');
                        break;            
                }
                console.log("Erro ao obter localização: ", error)
            },
            {enableHighAccuracy: true, timeout: 10000, maximumAge: 0}
        );
    } else {
        setError('Geolocalização não é suportada pelo navegador.');
    }
};

export { requestLocationPermission };
