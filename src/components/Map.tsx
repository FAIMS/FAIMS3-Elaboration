import React, {useEffect} from 'react';  
import leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import './Map.css'

const MapComponent = () => { 
    const position = new leaflet.LatLng(-33.854609, 151.217411)

    useEffect(() => {
        console.log("Rendering map")

        const map = leaflet.map('map')
        leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,      
            attribution:'&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors ,' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(map);

        map.setView(position, 13)
    })

    return (
        <div id="map"></div>
    )

}

export default MapComponent