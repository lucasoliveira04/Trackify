import { useEffect, useState } from "react";
import { requestLocationPermission } from "../util/geo-location";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useGoogleMaps } from "../context/GoogleMapsContext";

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

    const mapContainerStyle = {
        width: "100%",
        height: "400px",
    };

    const center = location ? { lat: location.latitude, lng: location.longitude } : { lat: 0, lng: 0 };

    const cleanAddress = (address: string | null) => {
        if (!address) return null;
        const addressParts = address.split(',');
        const cleanedAddressParts = addressParts.filter(part => part.trim() !== "undefined");
        return cleanedAddressParts.join(', ');
    };


    return (
        <div>
            {!location && !error && <p>Obtendo localização...</p>}
            {error && <p className="text-danger">{error}</p>}
            {location && googleMaps && (
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={15}
                >
                    <MarkerF position={{ lat: location.latitude, lng: location.longitude }}/>

                </GoogleMap>
            )}
            {address && <p>Endereço: {cleanAddress(address)}</p>}
        </div>
    );
};
