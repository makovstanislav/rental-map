'use client'
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {
    useEffect(() => {
        // Initialize the map
        if (!window.myMap) {
            window.myMap = L.map('map').setView([49.0384, 31.4513], 6);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap contributors'
            }).addTo(window.myMap);

            // Default icon
            var defaultIcon = L.icon({
                iconUrl: 'circle.png', 
                shadowUrl: 'circle-shadow.png', 
                iconSize: [25, 25],
                shadowSize: [30, 30], 
                iconAnchor: [12, 12], 
                shadowAnchor: [14, 14] 
            });
            
            // Active icon for clicked state
            var activeIcon = L.icon({
                iconUrl: 'circle-active.png', 
                shadowUrl: 'circle-shadow.png', 
                iconSize: [25, 25],
                shadowSize: [30, 30], 
                iconAnchor: [12, 12], 
                shadowAnchor: [14, 14] 
            });

            // Create a marker and add it to the map
            var marker = L.marker([49.0384, 31.4513], { icon: defaultIcon }).addTo(window.myMap);

            // Add click event to the marker
            marker.on('click', function() {
                marker.setIcon(activeIcon);
            });
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
        </div>
    );
}
