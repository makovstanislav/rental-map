'use client'
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Configure marker icon path
L.Icon.Default.imagePath = '/';
L.Icon.Default.prototype.options.iconUrl = 'leaflet/images/marker-icon.png';
L.Icon.Default.prototype.options.iconRetinaUrl = 'leaflet/images/marker-icon-2x.png';
L.Icon.Default.prototype.options.shadowUrl = 'leaflet/images/marker-shadow.png';

export default function Map() {
    useEffect(() => {
        // Initialize the map
        if (!window.myMap) {
            window.myMap = L.map('map').setView([49.0384, 31.4513], 6);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(window.myMap);
            L.marker([49.0384, 31.4513]).addTo(window.myMap);
        }
            
        // Cleanup function
        return () => {
            if (window.myMap) {
                window.myMap.remove();
                window.myMap = undefined;
            }
        };
    }, []);

    return (
        <div>
            <div id="map" style={{ height: '600px', width: '100%' }}></div>
            <div>jfkld</div>
        </div>
    );
}
