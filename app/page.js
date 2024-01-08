'use client'
import React, { useState, useEffect } from 'react';
import Map from '../components/map';
import styles from './page.module.css';
import { db } from '../firebaseClient';
import { ref, onValue } from "firebase/database";

export default function Home() {
  const [price, setPrice] = useState('Loading...'); // Initial state
  const [imageUrl, setImageUrl] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Ocean_world_Earth.jpg/1920px-Ocean_world_Earth.jpg')

  useEffect(() => {
    const priceRef = ref(db, '/857rfheskfhjkd/price');
    onValue(priceRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      setPrice(data); // Update state with fetched data
    });

    const imageRef = ref(db,'/857rfheskfhjkd/image' )
    onValue(priceRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      setPrice(data); // Update state with fetched data
    });
  }, []); // Empty dependency array to run once on mount

  return (
    <main className={styles.main}>
      <div className={styles.map}>
        <Map />
      </div>
      <div className={styles.feed}>
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <img src={imageUrl} className={styles.image}></img>
            <div className={styles.priceTag}>{price} грн / доба</div> {/* Use state variable here */}
          </div>
          <p className={styles.cardTitle}>Сдам 1к ул Драгоманова</p>
          <p className={styles.cardSubtitle}>Донецкий район Киев Украина</p>
        </div>
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <img src='/feed/apartments.jpg' className={styles.image}></img>
            <div className={styles.priceTag}>700 грн / доба</div>
          </div>
          <p className={styles.cardTitle}>Сдам 1к ул Драгоманова</p>
          <p className={styles.cardSubtitle}>Донецкий район Киев Украина</p>
        </div>
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <img src='/feed/bycicle.jpg' className={styles.image}></img>
            <div className={styles.priceTag}>700 грн / доба</div>
          </div>
          <p className={styles.cardTitle}>Сдам 1к ул Драгоманова</p>
          <p className={styles.cardSubtitle}>Донецкий район Киев Украина</p>
        </div>
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <img src='/feed/tetris.jpg' className={styles.image}></img>
            <div className={styles.priceTag}>700 грн / доба</div>
          </div>
          <p className={styles.cardTitle}>Сдам 1к ул Драгоманова</p>
          <p className={styles.cardSubtitle}>Донецкий район Киев Украина</p>
        </div>
      </div>
    </main>
  );
}
