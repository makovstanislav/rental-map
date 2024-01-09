'use client'
import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map({ cards, onMarkerClick, setVisibleCards }) {

    useEffect(() => {
        // Initialize the map
        if (typeof window !== 'undefined') {
            if (!window.myMap) {
                window.myMap = L.map('map').setView([49.0384, 31.4513], 6);
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '© OpenStreetMap contributors'
                }).addTo(window.myMap)
                
                console.log(window.myMap.getBounds())

                // Default icon
                var defaultIcon = L.icon({
                    iconUrl: 'circle.png',
                    shadowUrl: 'circle-shadow.png',
                    iconSize: [25, 25],
                    shadowSize: [30, 30],
                    iconAnchor: [12, 12],
                    shadowAnchor: [14, 14]
                })
    
                // Active icon for clicked state
                var activeIcon = L.icon({
                    iconUrl: 'circle-active.png',
                    shadowUrl: 'circle-shadow.png',
                    iconSize: [25, 25],
                    shadowSize: [30, 30],
                    iconAnchor: [12, 12],
                    shadowAnchor: [14, 14]
                })
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

            // Event listener for map move end
            window.myMap.on('moveend', () => {
                if (cards) {
                    const visibleCards = Object.keys(cards).filter(key => {
                        const cardLocation = cards[key].location;
                        const cardLatLng = L.latLng(cardLocation.X, cardLocation.Y);
                        return window.myMap.getBounds().contains(cardLatLng);
                    });

                    console.log('Visible cards:', visibleCards);

                    function filterCardsByVisibility(cards, visibleCardsIds) {
                        const filteredCards = {};
                        visibleCardsIds.forEach(id => {
                            if (cards[id]) {
                                filteredCards[id] = cards[id];
                            }
                        });
                        return filteredCards;
                    }

                    setVisibleCards(filterCardsByVisibility(cards,visibleCards))
                }
            });

            // Cleanup function
            return () => {
                if (window.myMap) {
                    window.myMap.off('moveend');
                    window.myMap.remove();
                    window.myMap = undefined;
                }
            }
        }

    }, [cards])

    return (
        <div>
            <div id="map" style={{ height: '600px', width: '100%' }}></div>
        </div>
    );
}