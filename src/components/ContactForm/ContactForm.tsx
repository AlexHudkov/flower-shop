import {useState, useEffect, useRef} from "react";
import IMask from "imask";
import styles from "./ContactForm.module.css";
import Modal from "../Modal/Modal";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        message: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const phoneRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (phoneRef.current) {
            const maskOptions = {
                mask: "+{38} (000) 000-00-00",
                lazy: false,
                placeholderChar: "_",
            };
            const mask = IMask(phoneRef.current, maskOptions);

            mask.on("accept", () => {
                setFormData((prev) => ({...prev, phone: mask.value}));
            });
        }
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim() && !formData.phone.trim()) {
            setErrorMessage("Будь ласка, введіть ім’я та номер телефону.");
            return;
        }
        if (!formData.name.trim()) {
            setErrorMessage("Будь ласка, введіть ім’я.");
            return;
        }
        if (!formData.phone.trim()) {
            setErrorMessage("Будь ласка, введіть номер телефону.");
            return;
        }
        if (formData.phone.includes("_")) {
            setErrorMessage("Будь ласка, введіть повний номер телефону.");
            return;
        }

        const botToken = import.meta.env.VITE_BOT_TOKEN;
        const chatId = import.meta.env.VITE_CHAT_ID;
        const text = `
📩 Нова заявка з сайту:
👤 Ім'я: ${formData.name}
📞 Телефон: ${formData.phone}
💬 Повідомлення: ${formData.message}
        `;

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({chat_id: chatId, text}),
        });

        setFormData({name: "", phone: "", message: ""});

        // Показати модалку успіху
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Зв'яжіться з нами</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Ім'я"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                />

                <input
                    ref={phoneRef}
                    type="text"
                    name="phone"
                    placeholder="Телефон"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.input}
                />

                <textarea
                    name="message"
                    placeholder="Повідомлення"
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textarea}
                />

                <button type="submit" className={styles.button}>Надіслати</button>
            </form>

            <Modal open={!!errorMessage} onClose={() => setErrorMessage("")}>
                <h2>{errorMessage}</h2>
            </Modal>

            <Modal open={success} onClose={() => setSuccess(false)}>
                <h2>✅ Ваше повідомлення надіслано!</h2>
            </Modal>
        </>
    );
}
