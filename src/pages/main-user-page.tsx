import { useEffect, useState } from "react";
import { cleanAddress, requestLocationPermission } from "../util/geo-location";
import { useGoogleMaps } from "../context/GoogleMapsContext";
import MapComponent from "../components/_google-map";

interface Location {
    latitude: number;
    longitude: number;
}

export const MainUserPage = () => {
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const {googleMaps} = useGoogleMaps()

    useEffect(() => {
        requestLocationPermission(
            (coords) => setLocation(coords),
            (errorMsg) => setError(errorMsg),
            (addr) => {
                setAddress(addr)
            }
        );
    }, []);


    return (
        <div>
            {!location && !error && <p>Obtendo localização...</p>}
            {error && <p className="text-danger">{error}</p>}
            {location && googleMaps && <MapComponent location={location}/>}
            {address && <p>Endereço: {cleanAddress(address)}</p>}
        </div>
    );
};
