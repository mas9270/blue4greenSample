// src/store/useLanguageStore.ts
import { create } from "zustand";
import enJson from "../locales/en.json";
import deJson from "../locales/de.json"; // اضافه کردن آلمانی
import type { Translations } from "../locales/localesTypes";

// نوع زبان داینامیک
export type Language = "en" | "de";
type Direction = "rtl" | "ltr";
type AcceptLanguage = "en-US" | "de-DE";

export type TranslationKeys = keyof Translations;

// Map زبان‌ها به JSON
const translationsMap: Record<Language, Translations> = {
  en: enJson,
  de: deJson,
};

// Map زبان‌ها به direction و acceptLanguage
const languageMeta: Record<
  Language,
  { direction: Direction; acceptLanguage: AcceptLanguage }
> = {
  en: { direction: "ltr", acceptLanguage: "en-US" },
  de: { direction: "ltr", acceptLanguage: "de-DE" },
};

interface LanguageState {
  language: Language;
  direction: Direction;
  acceptLanguage: AcceptLanguage;
  setLanguage: (lang: Language) => void;
  translate: (key: TranslationKeys) => string;
}

export const useLanguageStore = create<LanguageState>((set, get) => {
  // مقدار اولیه از localStorage یا پیش‌فرض fa
  const storedLang = (localStorage.getItem("lang") as Language) || "en";
  const { direction, acceptLanguage } = languageMeta[storedLang];

  document.documentElement.dir = direction;

  return {
    language: storedLang,
    direction,
    acceptLanguage,

    setLanguage: (lang: Language) => {
      const meta = languageMeta[lang];

      document.documentElement.dir = meta.direction;
      localStorage.setItem("lang", lang);

      set({
        language: lang,
        direction: meta.direction,
        acceptLanguage: meta.acceptLanguage,
      });
    },

    translate: (key: TranslationKeys) => {
      const { language } = get();
      const langJson = translationsMap[language];
      return langJson[key] || key;
    },
  };
});
