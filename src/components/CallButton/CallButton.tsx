import { useState, useEffect, useRef } from "react";
import IMask from "imask";
import styles from "./CallButton.module.css";
import Modal from "../Modal/Modal";

export default function CallButton() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", phone: "" });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false); // стан для модалки
    const phoneRef = useRef<HTMLInputElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open && phoneRef.current) {
            const maskOptions = {
                mask: "+{38} (000) 000-00-00",
                lazy: false,
                placeholderChar: "_",
            };
            const mask = IMask(phoneRef.current, maskOptions);
            mask.on("accept", () => {
                setFormData((prev) => ({ ...prev, phone: mask.value }));
            });
        }
    }, [open]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node) && open) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.phone.trim() || formData.phone.includes("_")) {
            setError(true);
            return;
        }

        const botToken = import.meta.env.VITE_BOT_TOKEN;
        const chatId = import.meta.env.VITE_CHAT_ID;
        const text = `📞 Замовлення дзвінка:\n👤 Ім'я: ${
            formData.name || "не вказано"
        }\n📞 Телефон: ${formData.phone}`;

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text }),
        });

        setFormData({ name: "", phone: "" });
        setOpen(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
    };

    return (
        <div className={styles.wrapper}>
            {/*<button className={styles.button} onClick={() => setOpen(!open)} title="Хочете щоб ми вам зателефонували?">☏</button>*/}
            <div className={styles.wrapper}>
                <button
                    className={styles.button}
                    onClick={() => setOpen(!open)}
                >
                    ☏
                    <span className={styles.tooltip}>Хочете щоб ми вам зателефонували?</span>
                </button>
            </div>


            {open && (
                <div className={styles.popup} ref={popupRef}>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Ім'я"
                            value={formData.name}
                            onChange={(e) => setFormData((prev) => ({...prev, name: e.target.value}))}
                            className={styles.input}
                        />
                        <input
                            ref={phoneRef}
                            type="text"
                            name="phone"
                            placeholder="+38 (___) ___-__-__"
                            required
                            className={styles.input}
                        />
                        <button type="submit" className={styles.submit}>Надіслати</button>
                    </form>
                </div>
            )}

            {success && <div className={styles.success}>✅ Ваш номер відправлено!</div>}

            <Modal open={error} onClose={() => setError(false)}>
                <h2>Будь ласка, заповніть ім’я та телефон</h2>
            </Modal>
        </div>
    );
}
