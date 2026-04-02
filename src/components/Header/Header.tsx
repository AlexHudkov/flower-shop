import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/florin-logo1.png";
import home from "/icons/home_sm.svg";
import { useEffect, useState } from "react";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const onHome = location.pathname === "/";
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleMenuItemClick = () => {
        setMenuOpen(false);
        setDropdownOpen(false);
    };

    const handleHomeClick = () => {
        handleMenuItemClick();
        if (onHome) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            navigate("/");
        }
    };

    const handleAnchorClick = (anchor: string) => {
        handleMenuItemClick();
        if (onHome) {
            // Вже на головній — одразу скролимо
            const el = document.getElementById(anchor);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            // З іншої сторінки — переходимо на головну з hash
            navigate(`/#${anchor}`);
        }
    };

    const toggleBurger = () => {
        setMenuOpen(prev => !prev);
        if (menuOpen) setDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const nav = document.querySelector(`.${styles.nav}`);
            if (nav && !nav.contains(event.target as Node)) {
                setMenuOpen(false);
                setDropdownOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <button onClick={handleHomeClick} className={styles.logoBtn}>
                        <img src={logo} alt="Florin logo" className={styles.logoImg}/>
                    </button>
                </div>

                <ul className={`${styles.menu} ${menuOpen ? styles.open : ""}`}>
                    <li>
                        <RouterLink to="/catalog" onClick={handleMenuItemClick}>
                            Каталог
                        </RouterLink>
                    </li>
                    <li>
                        <span className={styles.menuLink} onClick={() => handleAnchorClick("contacts")}>
                            Контакти
                        </span>
                    </li>
                    <li>
                        <span className={styles.menuLink} onClick={() => handleAnchorClick("map")}>
                            Ми на карті
                        </span>
                    </li>
                    <li
                        className={`${styles.dropdown} ${dropdownOpen ? styles.open : ""}`}
                        onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}
                    >
                        <span>Інформація ▾</span>
                        <ul className={styles.dropdownMenu}>
                            <li>
                                <span className={styles.menuLink} onClick={() => handleAnchorClick("about")}>
                                    Про нас
                                </span>
                            </li>
                            <li>
                                <RouterLink to="/deliveryPayment" onClick={handleMenuItemClick}>
                                    Доставка і оплата
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/care" onClick={handleMenuItemClick}>
                                    Догляд за зрізаними квітами
                                </RouterLink>
                            </li>
                            <li>
                                <span className={styles.menuLink} onClick={() => handleAnchorClick("faq")}>
                                    Часті питання
                                </span>
                            </li>
                        </ul>
                    </li>
                </ul>

                <div className={styles.homeBtn}>
                    <button onClick={handleHomeClick} className={styles.logoBtn}>
                        <img src={home} alt="Home" className={styles.icon}/>
                    </button>
                </div>

                <div
                    className={`${styles.burger} ${menuOpen ? styles.open : ""}`}
                    onClick={toggleBurger}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
        </header>
    );
}