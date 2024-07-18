import { GoogleMap, MarkerF } from "@react-google-maps/api"
import React from "react"

interface Location {
    latitude: number
    longitude: number
}

interface MapComponentProps {
    location: Location
}

const mapContainerStyle = {
    width: "400px",
    height: "400px"
}

const MapComponent: React.FC<MapComponentProps> = ({location}) => {
    const center = {lat: location.latitude, lng: location.longitude}

    return(
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
        >
            <MarkerF
                position={center}
            />
        </GoogleMap>
    )
}

export default MapComponent

