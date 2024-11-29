import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import HttpBackend from "i18next-http-backend"

const LANGUAGE_KEY = "savedLanguage";

const savedLanguage = localStorage.getItem(LANGUAGE_KEY) || "en";

i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
        lng: savedLanguage,
        debug: true,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: import.meta.env.VITE_TRANSLATIONS_PATH
        },
    })

export default i18n