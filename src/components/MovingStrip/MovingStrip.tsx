import styles from "./MovingStrip.module.css";

export default function MovingStrip() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.track}>
                <div className={styles.content}>
                    Чарівні квіти * Авторські букети * М'які іграшки * Ексклюзивний декор * Дизайнерські вази *
                    Персоналізованні подарунки *
                </div>
                <div className={styles.content}>
                    Чарівні квіти * Авторські букети * М'які іграшки * Ексклюзивний декор * Дизайнерські вази *
                    Персоналізованні подарунки *
                </div>
                <div className={styles.content}>
                    Чарівні квіти * Авторські букети * М'які іграшки * Ексклюзивний декор * Дизайнерські вази *
                    Персоналізованні подарунки *
                </div>
                <div className={styles.content}>
                    Чарівні квіти * Авторські букети * М'які іграшки * Ексклюзивний декор * Дизайнерські вази *
                    Персоналізованні подарунки *
                </div>
            </div>
        </div>
    );
}
