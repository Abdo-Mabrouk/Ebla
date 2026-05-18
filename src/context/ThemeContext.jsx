import { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const ThemeContext = createContext(null);

const getStoredDark = () => {
  if (typeof window === "undefined") return true;
  const stored = window.localStorage.getItem("theme-dark");
  return stored === null ? true : stored === "true";
};

const getStoredLang = () => {
  if (typeof window === "undefined") return "ar";
  const stored = window.localStorage.getItem("app-lang");
  return stored === "en" ? "en" : "ar";
};

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(getStoredDark);
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(getStoredLang);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem("theme-dark", dark.toString());
  }, [dark]);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    window.localStorage.setItem("app-lang", lang);
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  const toggleLang = () => {
    const next = lang === "ar" ? "en" : "ar";
    setLang(next);
  };

  return (
    <ThemeContext.Provider value={{ dark, setDark, lang, toggleLang }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
