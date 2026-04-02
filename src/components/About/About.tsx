import styles from "./About.module.css";

export default function About() {
    return (
        <section id="about" className={styles.about}>
            <div className={styles.container}>
                <div className={styles.textBlock}>
                    <h2 className={styles.title}>Про нас</h2>
                    <p className={styles.text}>
                        Ласкаво просимо до нашої квіткової майстерні, де кожен букет — це витвір мистецтва.
                        Ми створюємо незабутні квіткові композиції, які стануть ідеальним доповненням
                        до будь-якої події чи просто прикрасою вашого дня.
                    </p>
                    <p className={styles.text}>
                        Наша історія — це любов до квітів та прагнення ділитися цією любов'ю з вами.
                        Ми віримо, що квіти мають силу змінювати настрій та створювати особливу атмосферу.
                    </p>
                    <p className={styles.text}>
                        Ми пропонуємо не лише квіти, а й вишукані вази, милі іграшки та оригінальні подарунки,
                        щоб ви могли знайти все необхідне в одному місці. Наша місія — дарувати красу та позитивні
                        емоції.
                    </p>
                </div>
                <div className={styles.imageBlock}>
                    <img src="/about.png" alt="Florin shop"/>
                </div>
            </div>
        </section>
    );
}
