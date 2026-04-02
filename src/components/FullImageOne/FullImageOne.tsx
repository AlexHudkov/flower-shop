import {useEffect, useRef} from "react";
import styles from "./FullImageOne.module.css";

export default function FullImageOne() {
    const sectionRef = useRef<HTMLElement>(null);
    const isMobile = useRef(false);

    useEffect(() => {
        isMobile.current = window.matchMedia("(max-width: 1024px)").matches;

        // Паралакс тільки на десктопі
        if (!isMobile.current) {
            const handleScroll = () => {
                if (!sectionRef.current) return;
                const rect = sectionRef.current.getBoundingClientRect();
                const offset = rect.top * 0.3;
                sectionRef.current.style.setProperty("--parallax-offset", `${offset}px`);
            };
            window.addEventListener("scroll", handleScroll, {passive: true});
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    useEffect(() => {
        const cards = document.querySelector(`.${styles.cards}`);
        const section = sectionRef.current;
        const reviews = document.getElementById("reviews");

        if (!cards || !section || !reviews) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const target = entry.target as HTMLElement;

                    if (target === section) {
                        if (entry.intersectionRatio >= 0.1) {
                            cards.classList.add(styles.visible);
                        } else {
                            cards.classList.remove(styles.visible);
                        }
                    }

                    if (target === reviews) {
                        if (entry.intersectionRatio >= 0.2) {
                            cards.classList.remove(styles.visible);
                        } else {
                            const sectionVisible =
                                section.getBoundingClientRect().top < window.innerHeight &&
                                section.getBoundingClientRect().bottom > 0;
                            if (sectionVisible) cards.classList.add(styles.visible);
                        }
                    }
                });
            },
            {threshold: [0, 0.2]}
        );

        observer.observe(section);
        observer.observe(reviews);
        return () => observer.disconnect();
    }, []);

    return (
        <section className={styles.fullImage} ref={sectionRef}>
            <div className={styles.cards}>
                <div className={styles.topCard}>
                    <div className={`${styles.inner} ${styles.animate1} ${styles.delay1}`}>
                        <img src="/flowers_1.png" alt="Квітка" className={styles.image}/>
                        <h3>ШИРОКИЙ АСОРТИМЕНТ</h3>
                        <p>Широкий асортимент квітів, букетів, подарунків на будь-який випадок з доставкою</p>
                    </div>
                </div>
                <div className={styles.bottomRow}>
                    <div className={`${styles.inner} ${styles.animate2} ${styles.delay2}`}>
                        <img src="/flowers_2.png" alt="Квітка" className={styles.image}/>
                        <h3>ВИСОКА ЯКІСТЬ</h3>
                        <p>Завжди свіжі квіти роблять наші букети високої якості, які збирають досвідчені флористи</p>
                    </div>
                    <div className={`${styles.inner} ${styles.animate3} ${styles.delay3}`}>
                        <img src="/flowers_3.png" alt="Квітка" className={styles.image}/>
                        <h3>ДОСТУПНІ ЦІНИ</h3>
                        <p>Головною перевагою нашого магазину є доступні ціни на квіти та букети</p>
                    </div>
                </div>
            </div>
        </section>
    );
}