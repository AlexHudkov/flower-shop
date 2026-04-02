import { useState } from "react";
import styles from "./FAQ.module.css";

const faqData = [
    {
        question: "Як швидко ви доставляєте квіти?",
        answer: "Зазвичай доставка здійснюється протягом 1–2 годин після замовлення."
    },
    {
        question: "Як я можу оплатити замовлення?",
        answer: "Доступні онлайн-оплата карткою, банківський переказ або готівкою кур'єру."
    },
    {
        question: "Чи можна замовити анонімно?",
        answer: "Так, одержувач не дізнається імені замовника, якщо ви не захочете цього."
    },
    {
        question: "Чи можна отримати фото букета перед доставкою?",
        answer: "Так, ми завжди надсилаємо фото готового букета."
    },
    {
        question: "Можна отримати пораду з приводу догляду за букетом?",
        answer: 'Так, Ви можете прочитати про <a href="/care">догляд</a> у нас на сайті чи отримати консультацію у нашого флориста.'
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.faq} id="faq">
            <h2 className={styles.title}>Часті питання</h2>
            <ul className={styles.list}>
                {faqData.map((item, index) => (
                    <li key={index} className={styles.item}>
                        <button
                            className={styles.question}
                            onClick={() => toggle(index)}
                        >
                            {item.question}
                            <span className={styles.arrow}>
                {openIndex === index ? "▲" : "▼"}
              </span>
                        </button>
                        {openIndex === index && (
                            <div className={styles.answer}
                                 dangerouslySetInnerHTML={{__html: item.answer}}/>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}
