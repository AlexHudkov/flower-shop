import {useState, useRef, useEffect} from "react";
import styles from "./Reviews.module.css";

const reviews = [
    "Евгения, Вы очень большая молодец. \nБукет приехал вовремя, цветок свежевший. Хочу пожелать побольше постоянных клиентов. \nБукет правда огонь 🔥 \nСпасибо Вам большое, праздник получился очень шикарный благодаря Вашему букету",
    "Дівчата, дякую за сьогоднішнє замовлення! Квіти приїхали чудові❤️ Ви наче нещодавно відкрились, але я бажаю вам багато постійних клієнтів і цікавих замовлень! Успіху вам! ❤️",
    "Добрый день! Хочу выразить немножко своих эмоций 🔥🥰 \nБукет просто супер😍 очень милый и нежный🤗 приехал вовремя😊 Спасибо за подарочек к букету 😍 Теперь знаю где заказывать постоянно цветочки 😊",
    "Добрый! Неделю назад купила Рождественник, сейчас цветет, очень красиво 😻 \nПодскажите правильный уход за драценами, если подойдет и его возму",
    "Спасибо за такую прелесть, мама в восторге, вы лучшие 😘🥰 \nЖенечка, спасибо за букетик. Доставлено вовремя, мама очень довольна. Теперь только у вас будем заказывать, вы лучшие 🤗 процветания вам😘🥰",
    '<u><em>@kvitu_florin</em></u>💝💖 Спасибо за такую красоту 😇💖 \nВы лучшие 😘💗',
];

export default function Reviews() {
    // Рандомний початковий індекс
    const [current, setCurrent] = useState(() =>
        Math.floor(Math.random() * reviews.length)
    );
    const [isMobile, setIsMobile] = useState(false);
    const touchStartX = useRef<number | null>(null);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 767px)");
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    const prev = () => setCurrent(i => (i - 1 + reviews.length) % reviews.length);
    const next = () => setCurrent(i => (i + 1) % reviews.length);

    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
        touchStartX.current = null;
    };

    return (
        <section id="reviews" className={styles.reviews}>
            <h2 className={styles.title}>Відгуки</h2>

            {/* ── Десктоп / планшет: сітка ── */}
            {!isMobile && (
                <div className={styles.reviewsGrid}>
                    {reviews.map((text, index) => (
                        <div key={index} className={styles.card}>
                            <p dangerouslySetInnerHTML={{__html: text}}/>
                        </div>
                    ))}
                </div>
            )}

            {/* Мобільний: слайдер*/}
            {isMobile && (
                <div
                    className={styles.slider}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    <button
                        className={`${styles.arrow} ${styles.arrowLeft}`}
                        onClick={prev}
                        aria-label="Попередній відгук"
                    >
                        ‹
                    </button>

                    <div className={styles.slideTrack}>
                        <div className={styles.card}>
                            <p dangerouslySetInnerHTML={{__html: reviews[current]}}/>
                        </div>
                    </div>

                    <button
                        className={`${styles.arrow} ${styles.arrowRight}`}
                        onClick={next}
                        aria-label="Наступний відгук"
                    >
                        ›
                    </button>

                    {/* Dots */}
                    <div className={styles.dots}>
                        {reviews.map((_, i) => (
                            <button
                                key={i}
                                className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
                                onClick={() => setCurrent(i)}
                                aria-label={`Відгук ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}