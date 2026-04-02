import {useState} from "react";
import styles from "./Catalog.module.css";
import {mainFlowers, secondaryFlowers} from "../../data/flowers";

export default function Catalog() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleOpen = (image: string) => setSelectedImage(image);
    const handleClose = () => setSelectedImage(null);

    return (
        <section className={styles.catalog}>
            <h2 className={styles.title}>Наші квіти</h2>
            <div className={styles.grid}>
                {mainFlowers.map((flower, index) => (
                    <div key={index} className={styles.card}>
                        <img
                            src={flower.image}
                            alt={flower.name}
                            className={styles.image}
                            onClick={() => handleOpen(flower.image)}
                        />
                        <h3 className={styles.name}>{flower.name}</h3>
                        <p className={styles.description}>{flower.description}</p>
                    </div>
                ))}
            </div>

            <h2 className={styles.title}>Допоміжні квіти та зелень</h2>
            <div className={styles.grid}>
                {secondaryFlowers.map((flower, index) => (
                    <div key={index} className={styles.card}>
                        <img
                            src={flower.image}
                            alt={flower.name}
                            className={styles.image}
                            onClick={() => handleOpen(flower.image)}
                        />
                        <h3 className={styles.name}>{flower.name}</h3>
                        <p className={styles.description}>{flower.description}</p>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div className={styles.lightbox} onClick={handleClose}>
                    <img src={selectedImage} alt="flower" className={styles.lightboxImage}/>
                </div>
            )}
        </section>
    )
}
