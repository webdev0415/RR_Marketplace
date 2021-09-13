import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import dayjs from "dayjs"

import TRANSLATIONS_EN from "./locales/en.json"
import TRANSLATIONS_ZH from "./locales/zh.json"
import TRANSLATIONS_ES from "./locales/es.json"
import TRANSLATIONS_FR from "./locales/fr.json"
import TRANSLATIONS_JP from "./locales/jp.json"
import TRANSLATIONS_KR from "./locales/kr.json"
import TRANSLATIONS_RU from "./locales/ru.json"
import TRANSLATIONS_DE from "./locales/de.json"

require("dayjs/locale/de")
require("dayjs/locale/es")
require("dayjs/locale/fr")
require("dayjs/locale/ru")
require("dayjs/locale/zh")
require("dayjs/locale/ja")
require("dayjs/locale/ko")

const dayjsLocalMap = {
  en: "en",
  es: "es",
  fr: "fr",
  ru: "ru",
  zh: "zh",
  jp: "ja",
  kr: "ko",
  de: "de",
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    returnEmptyString: false,
    resources: {
      en: {
        translation: TRANSLATIONS_EN,
      },
      zh: {
        translation: TRANSLATIONS_ZH,
      },
      es: {
        translation: TRANSLATIONS_ES,
      },
      fr: {
        translation: TRANSLATIONS_FR,
      },
      jp: {
        translation: TRANSLATIONS_JP,
      },
      kr: {
        translation: TRANSLATIONS_KR,
      },
      ru: {
        translation: TRANSLATIONS_RU,
      },
      de: {
        translation: TRANSLATIONS_DE,
      },
    },
    interpolation: {
      format: (value, format, lange) => {
        if (value && dayjs(value).isValid()) {
          if (dayjsLocalMap[lange]) {
            return dayjs(value).locale(dayjsLocalMap[lange]).format(format)
          }
          return dayjs(value).format(format)
        }
        return value
      },
    },
  })

// i18n.changeLanguage("en");

export default i18n
