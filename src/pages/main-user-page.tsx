import { cleanAddress } from "../util/geo-location";
import { useGoogleMaps } from "../context/GoogleMapsContext";
import MapComponent from "../components/_google-map";
import { useLocation } from "../hooks/use-location";


export const MainUserPage = () => {
    const {googleMaps} = useGoogleMaps()
    const {location, error, address} = useLocation()


    return (
        <div>
            {!location && !error && <p>Obtendo localização...</p>}
            {error && <p className="text-danger">{error}</p>}
            {location && googleMaps && <MapComponent location={location}/>}
            {address && <p>Endereço: {cleanAddress(address)}</p>}
        </div>
    );
};
