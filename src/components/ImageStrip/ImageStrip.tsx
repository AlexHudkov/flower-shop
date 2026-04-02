import {useEffect, useRef, useState} from "react";
import styles from "./ImageStrip.module.css";

const images = [
    {src: "/forImageStrip/vase_1.jpg", alt: "Ваза"},
    {src: "/forImageStrip/gift.jpg", alt: "Подарунок"},
    {src: "/forImageStrip/bouquet.jpg", alt: "Букет"},
    {src: "/forImageStrip/decor.jpg", alt: "Декор"},
    {src: "/forImageStrip/toy.jpg", alt: "Іграшка"},
];

const COPIES = 5;
const MIDDLE = Math.floor(COPIES / 2);

export default function ImageStrip() {
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
    const [parallaxX, setParallaxX] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const copyWidthRef = useRef(0);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 1024px)");
        setIsMobileOrTablet(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobileOrTablet(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        if (isMobileOrTablet) return;
        const handleScroll = () => setParallaxX(window.scrollY * 0.3);
        window.addEventListener("scroll", handleScroll, {passive: true});
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isMobileOrTablet]);

    useEffect(() => {
        if (!isMobileOrTablet || !scrollRef.current) return;

        const el = scrollRef.current;

        const init = () => {
            copyWidthRef.current = el.scrollWidth / COPIES;
            el.scrollLeft = copyWidthRef.current * MIDDLE;
        };

        if (el.scrollWidth > el.clientWidth) {
            init();
        } else {
            const imgs = el.querySelectorAll("img");
            let loaded = 0;
            const onLoad = () => {
                loaded++;
                if (loaded === imgs.length) init();
            };
            imgs.forEach(img => {
                if (img.complete) {
                    loaded++;
                } else img.addEventListener("load", onLoad);
            });
            if (loaded === imgs.length) init();
        }
    }, [isMobileOrTablet]);

    const onScroll = () => {
        const el = scrollRef.current;
        if (!el || copyWidthRef.current === 0) return;

        const copy = copyWidthRef.current;
        const min = copy;
        const max = copy * (COPIES - 2);

        if (el.scrollLeft < min) {
            el.scrollLeft += copy;
        } else if (el.scrollLeft > max) {
            el.scrollLeft -= copy;
        }
    };

    const desktopOffset = parallaxX % (images.length * 340);

    return (
        <div className={styles.wrapper}>
            {isMobileOrTablet ? (
                <div
                    ref={scrollRef}
                    className={styles.scrollTrack}
                    onScroll={onScroll}
                >
                    {Array.from({length: COPIES}).map((_, copy) => (
                        <div key={copy} className={styles.copyGroup}>
                            {images.map((img, i) => (
                                <img key={i} src={img.src} alt={img.alt} draggable={false}/>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    className={styles.parallaxTrack}
                    style={{transform: `translateX(-${desktopOffset}px)`}}
                >
                    {[0, 1, 2].map(copy => (
                        <div key={copy} className={styles.content}>
                            {images.map((img, i) => (
                                <img key={i} src={img.src} alt={img.alt} draggable={false}/>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}