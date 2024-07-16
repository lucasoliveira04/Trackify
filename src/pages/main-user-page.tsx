import React, { useEffect, useState } from "react";
import { requestLocationPermission } from "../util/geo-location";

interface Location {
    latitude: number;
    longitude: number;
}

export const MainUserPage = () => {
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);

    useEffect(() => {
        requestLocationPermission(
            (coords) => setLocation(coords),
            (errorMsg) => setError(errorMsg),
            (addr) => setAddress(addr)
        );
    }, []);

    return (
        <div>
            {!location && !error && (
                <p>Obtendo localização...</p>
            )}

            {error && <p>{error}</p>}
            
            {location && (
                <div>
                    <p>
                        Latitude: {location.latitude}, <br/>
                        Longitude: {location.longitude}
                    </p>
                    {address && <p>Endereço: {address}</p>}
                </div>
            )}
        </div>
    );
};
