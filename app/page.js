import Map from '../components/map';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.map}>
        <Map />
      </div>
      <div className={styles.feed}>
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
