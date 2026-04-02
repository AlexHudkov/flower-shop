import {Routes, Route} from "react-router-dom";
import ScrollToTop from "./routing/ScrollToTop.tsx";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import ScrollToHashElement from "./routing/ScrollToHashElement.tsx";
import CarePage from "./pages/CarePage.tsx";
import DeliveryPaymentPage from "./pages/DeliveryPaymentPage.tsx";

export default function App() {
    return (
        <>
            <ScrollToTop/>
            <ScrollToHashElement/>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="catalog" element={<CatalogPage/>}/>
                    <Route path="care" element={<CarePage/>}/>
                    <Route path="deliveryPayment" element={<DeliveryPaymentPage/>}/>
                </Route>
            </Routes>
        </>
    );
}

