import { useEffect, useState } from "react";
import { requestLocationPermission } from "../util/geo-location";

interface Location {
    latitude: number;
    longitude: number;
}

interface UseLocationResult {
    location: Location | null;
    error: string | null;
    address: string | null;
}

export const useLocation = (): UseLocationResult => {
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);

    useEffect(() => {
        requestLocationPermission(
            (coords) => setLocation(coords),
            (errorMsg) => setError(errorMsg),
            (addr) => {
                setAddress(addr)
            }
        );
    }, []);

    return {location, error, address}
}