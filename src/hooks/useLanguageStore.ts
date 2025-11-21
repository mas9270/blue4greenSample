"use client";
import { create } from "zustand";
import enJson from "../locales/en.json";
import deJson from "../locales/de.json";
import type { Translations } from "../locales/localesTypes";

export type Language = "en" | "de";
type Direction = "rtl" | "ltr";
type AcceptLanguage = "en-US" | "de-DE";
export type TranslationKeys = keyof Translations;

const translationsMap: Record<Language, Translations> = {
  en: enJson,
  de: deJson,
};

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
  // مقدار اولیه پیش‌فرض
  const defaultLang: Language = "en";
  const storedLang =
    typeof window !== "undefined"
      ? (localStorage.getItem("lang") as Language)
      : defaultLang;
  const { direction, acceptLanguage } = languageMeta[storedLang || defaultLang];

  if (typeof window !== "undefined") {
    document.documentElement.dir = direction;
  }

  return {
    language: storedLang || defaultLang,
    direction,
    acceptLanguage,

    setLanguage: (lang: Language) => {
      const meta = languageMeta[lang];
      if (typeof window !== "undefined") {
        localStorage.setItem("lang", lang);
        document.documentElement.dir = meta.direction;
      }
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
