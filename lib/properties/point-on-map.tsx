import * as React from 'react'
import ReactMapboxGl, {Marker} from "react-mapbox-gl";
import {LocationMarkerIcon} from "@heroicons/react/solid";

const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoicmVsb2NpZnkiLCJhIjoiY2wybWJjeGtxMGxtYjNibmsxYjZrdTVrOCJ9.NPMlF0xZYa0t35r7SilHXA'
});

interface PointOnMapProps {
    lat: number
    lng: number
}

export const PointOnMap = ({ lat, lng }: PointOnMapProps) => {
    const [show, setShow] = React.useState(false)

    React.useEffect(() => {
        setTimeout(() => setShow(true), 250)
    }, [])

    return (
        <div className="mt-4 rounded-md overflow-hidden">
            {show && <Map
                style="mapbox://styles/mapbox/streets-v11"
                containerStyle={{
                    height: '200px',
                    width: '100%'
                }}
                zoom={[11]}
                center={[lat, lng]}
            >
                <Marker coordinates={[lat, lng]}>
                    <LocationMarkerIcon className="h-10 w-10 text-blue-700" />
                </Marker>
            </Map>}
        </div>
    )
}
