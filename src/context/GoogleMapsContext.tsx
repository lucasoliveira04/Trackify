import React, { createContext, useContext, useState, ReactNode } from "react";
import { LoadScript } from "@react-google-maps/api";

interface GoogleMapsContextProps {
    googleMaps: typeof google | null;
}

const GoogleMapsContext = createContext<GoogleMapsContextProps | undefined>(undefined);

export const useGoogleMaps = (): GoogleMapsContextProps => {
    const context = useContext(GoogleMapsContext);
    if (!context) {
        throw new Error("useGoogleMaps must be used within a GoogleMapsProvider");
    }
    return context;
}

interface GoogleMapsProviderProps {
    children: ReactNode;
}

const libraries = ["places"];

export const GoogleMapsProvider: React.FC<GoogleMapsProviderProps> = ({ children }) => {
    const [googleMaps, setGoogleMaps] = useState<typeof google | null>(null);
    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const key = "AIzaSyB1EgpMGZ8aCsfqR4nb6xNS7OP8JKiV26Y"

    // if (!googleMapsApiKey) {
    //     throw new Error("Google Maps API key is missing. Add it to your .env.local file.");
    // }

    return (
        <LoadScript
            googleMapsApiKey={googleMapsApiKey}
            libraries={libraries}
            onLoad={() => setGoogleMaps(google)}
        >
            <GoogleMapsContext.Provider value={{ googleMaps }}>
                {children}
            </GoogleMapsContext.Provider>
        </LoadScript>
    );
}
