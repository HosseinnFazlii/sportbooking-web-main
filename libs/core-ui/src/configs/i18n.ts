import i18next from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resolveAssetPrefix = () => {
  if (typeof window !== 'undefined') {
    const prefix = ((window as any).__NEXT_DATA__?.assetPrefix as string) || ''
    if (prefix) {
      return prefix
    }

    const webpackPublicPath = ((globalThis as any).__webpack_require__?.p as string) || ''

    if (webpackPublicPath && webpackPublicPath !== 'auto') {
      const normalized = webpackPublicPath.replace(/\/_next.*$/, '').replace(/\/$/, '')
      if (normalized) {
        return normalized
      }
    }
  }

  if (typeof process !== 'undefined') {
    return process.env.NEXT_PUBLIC_ASSET_PREFIX || process.env.ASSET_PREFIX || ''
  }

  return ''
}

const normalizePrefix = (prefix: string) => {
  if (!prefix) {
    return ''
  }

  const trimmed = prefix.replace(/\/$/, '')

  if (!trimmed) {
    return ''
  }

  if (/^https?:/i.test(trimmed)) {
    return trimmed
  }

  if (trimmed.startsWith('/')) {
    return trimmed
  }

  return `/${trimmed}`
}

const assetPrefix = normalizePrefix(resolveAssetPrefix())
const localesPath = `${assetPrefix}/locales/{{lng}}.json`

i18next
  // Enables the i18next backend
  .use(Backend)

  // Enable automatic language detection
  .use(LanguageDetector)

  // Enables the hook initialization module
  .use(initReactI18next)
  .init({
    lng: 'fa',
    backend: {
      /* translation file path */
      loadPath: localesPath
    },
    fallbackLng: 'fa',
    supportedLngs: ['en', 'fa'],
    load: 'currentOnly',
    debug: false,
    keySeparator: false,
    react: {
      useSuspense: false
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    }
  });

export const i18n = i18next;
