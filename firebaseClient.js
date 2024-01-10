import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "rental-map-3a947.firebaseapp.com",
    databaseURL: "https://rental-map-3a947-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "rental-map-3a947",
    storageBucket: "rental-map-3a947.appspot.com",
    messagingSenderId: "146891190096",
    appId: "1:146891190096:web:c013425c353e497e7a0655"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const storage = getStorage(app)

export {db, storage}