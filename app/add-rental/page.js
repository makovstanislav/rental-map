'use client'
import React, { useState, useRef } from 'react';
import { db, storage } from '../../firebaseClient'; 
import { ref as dbRef, push } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import LocationPickerMap from '../../components/locationPickerMap'

export default function AddRental() {
    if(typeof window !== 'undefined') {
        const [title, setTitle] = useState(null);
    const [price, setPrice] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [location, setLocation] = useState({ X: 50.0384, Y: 31.4513 });
    const [showMap, setShowMap] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        // Upload the image to Firebase Storage
        const imageRef = storageRef(storage, 'rental_images/' + imageFile.name);
        try {
            const snapshot = await uploadBytes(imageRef, imageFile);
            const downloadURL = await getDownloadURL(snapshot.ref);

            // Submit all data to Firebase Realtime Database
            const newRentalRef = dbRef(db, 'cards/');
            const newRental = { image: downloadURL, title, price, location };
            await push(newRentalRef, newRental);
            alert('Rental object added successfully');
        } catch (error) {
            console.error("Error adding rental object: ", error);
            alert('Error adding rental object');
        }

        // Clear the form
        setTitle('');
        setPrice('');
        setImageFile(null);
        setUploading(false);
    };

    const handleLocationSelect = (selectedLocation) => {
        setLocation(selectedLocation);
        setShowMap(false);
        console.log(selectedLocation)
    };

    return (
        <div>
            <h2>Add a New Rental Object</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Image</label>
                    <input 
                        type="file" 
                        onChange={(e) => setImageFile(e.target.files[0])} 
                    />
                </div>
                <div>
                    <label>Title</label>
                    <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input 
                        type="number" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Submit'}
                </button>
                <div>
                    <button type="button" onClick={() => setShowMap(true)}>Find on the Map</button>
                </div>
                {showMap && <LocationPickerMap onLocationSelect={handleLocationSelect} />}
                <button type="submit" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Submit'}
                </button>
            </form>
        </div>
    );
    }
    
}
