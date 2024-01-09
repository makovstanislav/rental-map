import styles from '../app/page.module.css';

export default function Card({ imageUrl, title, price, location}) {
  return(
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img src={imageUrl} className={styles.image}></img>
          <div className={styles.priceTag}>{price} грн / доба</div>
        </div>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.cardSubtitle}>{location}</p>
      </div>
  )
}