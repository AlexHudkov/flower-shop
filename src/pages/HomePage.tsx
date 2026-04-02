import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import FullImageOne from "../components/FullImageOne/FullImageOne";
import Reviews from "../components/Reviews/Reviews";
import MovingStrip from "../components/MovingStrip/MovingStrip";
import ImageStrip from "../components/ImageStrip/ImageStrip";
import FullImageTwo from "../components/FullImageTwo/FullImageTwo.tsx";
import FAQ from "../components/faq/FAQ.tsx";
import Socials from "../components/Socials/Socials.tsx";
import ContactForm from "../components/ContactForm/ContactForm.tsx";
import Map from "../components/Map/Map.tsx";
import CallButton from "../components/CallButton/CallButton.tsx";
import "../styles/global.css";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";

export default function HomePage() {
    const location = useLocation();

    useEffect(() => {
        const hash = location.hash.replace("#", "");
        if (!hash) {
            // Якщо немає hash — скролимо на початок
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        const scroll = () => {
            const el = document.getElementById(hash);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        };

        const timer = setTimeout(scroll, 500);
        return () => clearTimeout(timer);
    }, [location.hash]);
    return (
        <main>
            <div className="container">
                <Hero/>
                <About/>
                <FullImageOne/>
                <Reviews/>
                <MovingStrip/>
                <ImageStrip/>
                <FullImageTwo/>
                <FAQ/>
                <Socials/>
                <ContactForm/>
                <Map/>
                <CallButton/>
            </div>
        </main>
    );
}
