import styles from "./Modal.module.css";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({open, onClose, children}: ModalProps) {
    if (!open) return null;

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {children}
                <button className={styles.close} onClick={onClose}>Закрити</button>
            </div>
        </div>
    );
}
