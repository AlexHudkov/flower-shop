import styles from "./Socials.module.css";

export default function Socials() {
    return (
        <section id="contacts" className={styles.socials}>
            <h2 className={styles.title}>Ми завжди поруч</h2>


            <div className={styles.contacts}>
                <p><strong>Адреса:</strong> м. Одеса, Іцхака Рабіна 23</p>
                <p><strong>Телефон:</strong> +38 (093) 708-04-33</p>
                <p><strong>Графік роботи:</strong> Пн–Нд: 8:00 – 21:00</p>
            </div>


            <div className={styles.icons}>
                <a href="https://instagram.com/kvitu_florin/" target="_blank" rel="noopener noreferrer">
                    <img src="/icons/instagram.svg" alt="Instagram"/>
                </a>
                <a href="https://tiktok.com/@kvitu_florin" target="_blank" rel="noopener noreferrer">
                    <img src="/icons/tiktok.svg" alt="TikTok"/>
                </a>
                <a href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer">
                    <img src="/icons/telegram.svg" alt="Telegram"/>
                </a>
                <a href="viber://chat?number=380937080433">
                    <img src="/icons/viber.svg" alt="Viber"/>
                </a>
                <a href="https://wa.me/380937080433" target="_blank" rel="noopener noreferrer">
                    <img src="/icons/whatsapp.svg" alt="WhatsApp"/>
                </a>
            </div>
        </section>
    );
}
