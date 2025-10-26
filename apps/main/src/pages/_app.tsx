// apps/main/src/pages/_app.tsx
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { Router } from 'next/router';
import {
  LocalizationProvider,
  ThemeComponent,
  SettingsProvider,
  SettingsConsumer,
  themeConfig,
  DynamicFederation,
  EmotionCache,
  NProgress,
  AuthProvider,
  i18n,
  Toaster,
  ReactHotToast,
  useAuth,
  Settings,
  settingsConfig
} from '@mf-core/core-ui';
import { AdapterDateFns, AdapterDateFnsJalali } from '@mui/x-date-pickers';
import { baseThemeOptions } from "../layouts/theme-options";
import { remoteApps } from '../../module-federation.remotes';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/globals.css';
import '../styles/home.css';
import Head from 'next/head';

import enLocale from '../locales/en';
import faLocale from '../locales/fa';
// import { sportbookingEn as sportbookingEnLocale, sportbookingFa as sportbookingFaLocale } from '../../../sportbooking/src/locales';

const baseLocales: Record<string, Record<string, string>> = {
  en: enLocale,
  fa: faLocale
};

let localesRegistered = false;

const registerLocales = () => {
  if (localesRegistered) {
    return;
  }

  const namespace = 'translation';
  Object.entries(baseLocales).forEach(([lng, resources]) => {
    i18n.addResourceBundle(lng, namespace, resources, true, true);
  });

  localesRegistered = true;
};

const getLanguageOrDefault = (settings: Settings) => settings.language || settingsConfig.defaultLanguage;

const getDirectionForLanguage = (language: string, fallback: Settings['direction']): Settings['direction'] => {
  if (language === 'fa') {
    return 'rtl';
  }

  if (language === 'en') {
    return 'ltr';
  }

  return fallback;
};

const LocalizationSynchronizer = ({ settings }: { settings: Settings }) => {
  const { user } = useAuth();
  const activeLanguage = getLanguageOrDefault(settings);
  const currentDirection = getDirectionForLanguage(activeLanguage, settings.direction);

  useEffect(() => {
    if (i18n.language !== activeLanguage) {
      void i18n.changeLanguage(activeLanguage);
    }

    if (typeof document !== 'undefined') {
      document.documentElement.lang = activeLanguage;
      document.documentElement.dir = currentDirection;
      document.body.style.direction = currentDirection;
    }
  }, [activeLanguage, currentDirection]);

  useEffect(() => {
    if (!user?.menus?.length) {
      return;
    }

    const englishResources: Record<string, string> = {};
    const persianResources: Record<string, string> = {};

    user.menus.forEach(menu => {
      const key = menu.name?.trim();
      if (!key) {
        return;
      }

      englishResources[key] = menu.name;

      const localizedName =
        (menu as unknown as { translations?: Record<string, string> }).translations?.fa ??
        (menu as unknown as { translations?: Record<string, string> }).translations?.['fa-IR'] ??
        (menu as unknown as { faName?: string }).faName ??
        (menu as unknown as { nameFa?: string }).nameFa ??
        (menu as unknown as { persianName?: string }).persianName ??
        (menu as unknown as { fa?: string }).fa;

      if (localizedName) {
        persianResources[key] = localizedName;
      }
    });

    if (Object.keys(englishResources).length) {
      i18n.addResources('en', 'translation', englishResources);
    }

    if (Object.keys(persianResources).length) {
      i18n.addResources('fa', 'translation', persianResources);
    }
  }, [user?.menus]);

  return null;
};

type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
}

if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

export default function App({ Component, pageProps }: ExtendedAppProps) {
  DynamicFederation.getInstance(remoteApps);
  const setConfig = Component.setConfig ?? undefined;
  registerLocales();

  return (
    <AuthProvider key="AuthProvider">
      <SettingsProvider key="SettingsProvider" {...(setConfig ? { pageSettings: setConfig() } : {})}>
        <SettingsConsumer key="SettingsConsumer">
          {({ settings }) => {
            return (
              <>
                <LocalizationSynchronizer settings={settings} />
                <Head>
                  <title>{i18n.t(settings.name)}</title>
                </Head>

                <ThemeComponent key="ThemeComponent" settings={settings} userThemeOptions={baseThemeOptions}>
                  <LocalizationProvider
                    key="LocalizationProvider"
                    dateAdapter={settings.calendar === 'jalali' ? AdapterDateFnsJalali : AdapterDateFns}
                  >
                    <Component key="app_Component" {...pageProps} />
                  </LocalizationProvider>
                  <ReactHotToast>
                    <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} containerStyle={{ zIndex: "9999!important" }} />
                  </ReactHotToast>
                </ThemeComponent>
              </>
            )
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </AuthProvider>
  )
}
