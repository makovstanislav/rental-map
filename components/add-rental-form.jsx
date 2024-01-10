'use client'
import { useState, useRef } from 'react';
import { db, storage } from '../firebaseClient' 
import { ref as dbRef, push } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import LocationPickerMap from './maps/locationPickerMap'
import styles from '../styles/addRentals.module.css'

export default function AddRentalForm() {
    const [title, setTitle] = useState(null);
    const [price, setPrice] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [location, setLocation] = useState({ X: 50.0384, Y: 31.4513 });
    const [showMap, setShowMap] = useState(false);
    const [locationName, setLocationName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any field is empty
        if (!title || !price || !imageFile || !locationName) {
            setErrorMessage('There should not be empty fields');
            return;
        }

        setUploading(true);
        setErrorMessage('');

        // Upload the image to Firebase Storage
        const imageRef = storageRef(storage, 'rental_images/' + imageFile.name);
        try {
            const snapshot = await uploadBytes(imageRef, imageFile);
            const downloadURL = await getDownloadURL(snapshot.ref);

            // Submit all data to Firebase Realtime Database
            const newRentalRef = dbRef(db, 'cards/');
            const newRental = {
                image: downloadURL, 
                title, 
                price, 
                location: { ...location, full: locationName } // Include full address
            };
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
    };

    return (
        <div className={styles.addRentalContainer}>
            <h2 className={styles.addRentalTitle}>Add a New Rental Object</h2>
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
            <form onSubmit={handleSubmit} className={styles.addRentalForm}>
                <div className={styles.addRentalFormGroup}>
                    <label className={styles.addRentalLabel}>Image</label>
                    <input 
                        type="file" 
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className={styles.addRentalInput}
                    />
                </div>
                <div className={styles.addRentalFormGroup}>
                    <label className={styles.addRentalLabel}>Title</label>
                    <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.addRentalInput}
                    />
                </div>
                <div className={styles.addRentalFormGroup}>
                    <label className={styles.addRentalLabel}>Price</label>
                    <input 
                        type="number" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className={styles.addRentalInput}
                    />
                </div>
                <div className={styles.addRentalFormGroup}>
                    <label className={styles.addRentalLabel}>Location</label>
                    <input 
                        type="text" 
                        value={locationName}
                        readOnly
                        className={styles.addRentalInput}
                        placeholder='...pick a location on the map below'
                    />
                </div>
                <div className={styles.addRentalFormGroup}>
                    <button type="button" onClick={() => setShowMap(true)} className={styles.addRentalMapButton}>
                        Find on the Map  🌍
                    </button>
                </div>
                <button type="submit" disabled={uploading} className={styles.addRentalSubmitButton}>
                    {uploading ? 'Uploading...' : 'Submit'}
                </button>
                
                {showMap && <LocationPickerMap 
                    onLocationSelect={handleLocationSelect} 
                    setLocationName={setLocationName} 
                    onClose={() => setShowMap(false)} 
                />}
            </form>
        </div>
    );
}

