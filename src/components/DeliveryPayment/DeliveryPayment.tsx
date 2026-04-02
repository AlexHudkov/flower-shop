import styles from "./DeliveryPayment.module.css";

export default function DeliveryPayment() {
    return (
        <section className={styles.delivery}>
            <h1 className={styles.title}>Доставка і оплата</h1>

            <div className={styles.intro}>
                <p>
                    Ми прагнемо зробити процес замовлення максимально зручним для вас.
                    Нижче наведені основні варіанти доставки та способи оплати.
                    Остаточні умови можуть уточнюватися при оформленні замовлення.
                </p>
            </div>

            <div className={styles.grid}>
                <div className={styles.block}>
                    <img src="delivery.png" alt="Доставка" className={styles.icon} />
                    <h2>Доставка кур’єром</h2>
                    <p>
                        Наш кур’єр доставить букет прямо до дверей або у вказане місце.
                        Ви можете обрати точний час доставки або найближчий можливий.
                    </p>
                    <ul>
                        <li>Доставка по місту та області</li>
                        <li>Можливість термінової доставки</li>
                        <li>Вартість залежить від відстані</li>
                    </ul>
                </div>

                <div className={styles.block}>
                    <img src="/selfpickup.png" alt="Самовивіз" className={styles.icon} />
                    <h2>Самовивіз</h2>
                    <p>
                        Ви можете забрати замовлення самостійно у нашому магазині.
                        Це зручно, якщо ви поруч або хочете особисто обрати букет.
                    </p>
                    <ul>
                        <li>Попереднє узгодження часу</li>
                        <li>Без додаткової оплати</li>
                        <li>Можливість оглянути асортимент</li>
                    </ul>
                </div>

                <div className={styles.block}>
                    <img src="payment.png" alt="Оплата" className={styles.icon} />
                    <h2>Оплата</h2>
                    <p>
                        Ми пропонуємо кілька варіантів оплати, щоб вам було зручно:
                    </p>
                    <ul>
                        <li>Готівкою при отриманні</li>
                        <li>Банківськими картками (Visa, MasterCard)</li>
                        <li>Онлайн‑оплата через платіжні системи</li>
                        <li>Безготівковий розрахунок для корпоративних клієнтів</li>
                    </ul>
                </div>
            </div>

            <div className={styles.note}>
                <img src="flowers_del.png" alt="Квіти" className={styles.noteImage} />
                <p>
                    Умови доставки та оплати можуть змінюватися залежно від сезону та акцій.
                    Ми завжди готові узгодити деталі, щоб зробити процес максимально комфортним.
                </p>
            </div>
        </section>
    );
}
