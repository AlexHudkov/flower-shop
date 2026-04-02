import styles from "./Map.module.css";

export default function Map() {
    return (
        <>
            <section id="map" className={styles.contacts}>
                <div className={styles.mapWrapper}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d687.4208104009994!2d30.69925476966927!3d46.43515762245017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c633000d70a6a3%3A0xf34b58dffdcb8b33!2sFlorin!5e0!3m2!1suk!2sua!4v1774343530308!5m2!1suk!2sua"
                        style={{border: 0}}
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>

                <div className={styles.info}>
                    <p className={styles.text}>📍 м. Одеса, Іцхака Рабіна 23</p>
                    <p className={styles.text}>📞 +38 (093) 708-04-33</p>
                    <p className={styles.text}>🕒 Пн–Нд: 8:00 – 21:00</p>

                </div>
            </section>

            <footer className={styles.footer}>
                © 2026 Florin Всі права захищені.
            </footer>
        </>
    )
}