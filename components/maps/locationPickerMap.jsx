'use client'
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LocationPickerMap = ({ onLocationSelect, onClose }) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    

    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) {
            // Initialize the map
            mapRef.current = L.map(mapContainerRef.current).setView([49.0384, 31.4513], 6);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap contributors'
            }).addTo(mapRef.current);

            // Initialize the marker
            markerRef.current = L.marker([49.0384, 31.4513], { draggable: true }).addTo(mapRef.current);
            markerRef.current.on('dragend', function(event) {
                const position = event.target.getLatLng();
                onLocationSelect({ X: position.lat, Y: position.lng });
            });

            mapRef.current.on('click', function(e) {
                markerRef.current.setLatLng(e.latlng);
            });
        }

        return () => {
            // Cleanup the map
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    const handleConfirm = () => {
        if (markerRef.current) {
            const { lat, lng } = markerRef.current.getLatLng();
            onLocationSelect({ X: lat, Y: lng });
            if (onClose) onClose();
        }
    };

    return (
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: '80%', height: '80%', zIndex: 1000, backgroundColor: 'white' }}>
            <div ref={mapContainerRef} style={{ height: '90%' }}></div>
            <button onClick={handleConfirm}>Confirm Location</button>
            {onClose && <button onClick={onClose}>Cancel</button>}
        </div>
    );
};

export default LocationPickerMap;

