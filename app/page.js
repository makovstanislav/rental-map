'use client'
import React, { useState, useEffect } from 'react';
import Map from '../components/map';
import Card from '@/components/card';
import styles from './page.module.css';
import { db } from '../firebaseClient';
import { ref, onValue } from "firebase/database";

export default function Home() {
  const [cards, setCards] = useState()

  useEffect(() => {
    const cards = ref(db,'/cards' )
    onValue(cards, (snapshot) => {
      const data = snapshot.val();
      setCards(data || {})
      console.log(Object.keys(data))
    });

  }, []); 

  return (
    <main className={styles.main}>
      <div className={styles.map}>
        <Map />
      </div>
      <div className={styles.feed}>
        {cards && Object.keys(cards).map((key) => {
            const card = cards[key];
            return (
              <Card 
                key={key} 
                imageUrl={card.image}
                title={card.title}
                price={card.price}
                location={card.subtitle}
              />  
            )
        })}
      </div>
    </main>
  );
}
