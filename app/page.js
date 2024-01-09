'use client'
import React, { useState, useEffect } from 'react';
import Map from '../components/map';
import Card from '@/components/card';
import styles from './page.module.css';
import { db } from '../firebaseClient';
import { ref, onValue } from "firebase/database";

export default function Home() {
    const [cards, setCards] = useState({});
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        const cardsRef = ref(db, '/cards');
        onValue(cardsRef, (snapshot) => {
            const data = snapshot.val();
            setCards(data || {});
            console.log(Object.keys(data));
        });
    }, []);

    const handleMarkerClick = (cardKey) => {
        setSelectedCard(cardKey);
    }

    return (
      <>
        <header className={styles.header}>
            <h1 className={styles.headerTitle}>Rental Listings</h1>
            <button className={styles.addButton} href='/add-rental'>Add a New Rental Object</button>
        </header>
        <main className={styles.main}>
            <div className={styles.map}>
                <Map cards={cards} onMarkerClick={handleMarkerClick} />
            </div>
            <div className={styles.feed}>
                {cards && Object.keys(cards)
                    .filter(key => !selectedCard || key === selectedCard)
                    .map((key) => {
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
                    })
                }
            </div>
        </main>
      </>    
    )
}

