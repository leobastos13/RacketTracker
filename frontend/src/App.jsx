import { useTranslation } from "react-i18next"
import Home from "./pages/Home";
import Rackets from "./pages/Rackets";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext } from "react";
export const TranslationsContext = createContext();

function App() {
    const { t, i18n } = useTranslation();
    const languages = [
        { code: 'en', name: t("listFirstItem")},
        { code: 'pt', name: t("listSecondItem")},
    ]
    
    return (
       <TranslationsContext.Provider
            value={{languages, t, i18n}}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/rackets" element={<Rackets />} />
                </Routes>
            </BrowserRouter>
        </TranslationsContext.Provider>
    )
}

export default App
