'use client'
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map({ cards, onMarkerClick }) {
    useEffect(() => {
        if (typeof window !== 'undefined') {
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
            }
        }
        

        // Add markers for each card
        if (cards) {
            Object.keys(cards).forEach(key => {
                const { location } = cards[key];
                const lat = location.X;
                const lng = location.Y;

                var marker = L.marker([lat, lng], { icon: defaultIcon }).addTo(window.myMap);

                marker.on('click', function() {
                    onMarkerClick(key);
                    marker.setIcon(activeIcon);
                    // Reset other markers to defaultIcon
                    window.myMap.eachLayer(function (layer) {
                        if (layer instanceof L.Marker && layer !== marker) {
                            layer.setIcon(defaultIcon);
                        }
                    });
                });
            });
        }

        // Cleanup function
        return () => {
            if (window.myMap) {
                window.myMap.remove();
                window.myMap = undefined;
            }
        };
    }, [cards]);

    return (
        <div>
            <div id="map" style={{ height: '600px', width: '100%' }}></div>
        </div>
    );
}
