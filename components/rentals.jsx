'use client'
import { useState, useEffect } from 'react';
import Map from '../components/maps/map';
import Card from '@/components/card';
import { db } from '../firebaseClient';
import { ref, onValue } from "firebase/database";
import styles from '../app/page.module.css';

export default function Rentals() {

    const [cards, setCards] = useState(null);
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