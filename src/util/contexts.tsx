import React, { ReactNode } from "react";
import { AuthProvider } from "../context/google/auth/GoogleAuthContext";
import { GoogleMapsProvider } from "../context/google/map/GoogleMapsContext";

const providers = [
    AuthProvider,
    GoogleMapsProvider
]

interface AppProviderProps {
    children: ReactNode
}

const AppProviders : React.FC<AppProviderProps> = ({children}) => {
    return (
        <>
            {providers.reduce((AccumulatedProviders, CurrentProvider) => {
                return(
                    <CurrentProvider>
                        {AccumulatedProviders}
                    </CurrentProvider>
                )
            }, children)}
        </>
    )
}

export default AppProviders