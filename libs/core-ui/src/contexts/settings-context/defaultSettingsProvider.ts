import { LanguageCode, Settings } from "./types";
import { themeConfig, settingsConfig } from '../../configs';
import { applyDerivedSettings, getCalendarByLanguage, resolveDateUtils } from './deriveSettings';

const defaultLanguage = settingsConfig.defaultLanguage as LanguageCode;
const defaultCalendar = getCalendarByLanguage(defaultLanguage);

const baseSettings: Settings = {
    themeColor: 'primary',
    mode: themeConfig.mode,
    skin: themeConfig.skin,
    footer: themeConfig.footer,
    layout: themeConfig.layout,
    lastLayout: themeConfig.layout,
    direction: settingsConfig.defaultLanguage === 'fa' ? 'rtl' : 'ltr',
    navHidden: themeConfig.navHidden,
    appBarBlur: themeConfig.appBarBlur,
    navCollapsed: themeConfig.navCollapsed,
    contentWidth: themeConfig.contentWidth,
    toastPosition: themeConfig.toastPosition,
    verticalNavToggleType: themeConfig.verticalNavToggleType,
    appBar: themeConfig.layout === 'horizontal' && themeConfig.appBar === 'hidden' ? 'fixed' : themeConfig.appBar,
    name: settingsConfig.name,
    version: settingsConfig.version,
    apiHost: settingsConfig.apiHost,
    language: defaultLanguage,
    calendar: defaultCalendar,
    dateUtils: resolveDateUtils(defaultCalendar)
};

export const defaultSettingsProvider: Settings = applyDerivedSettings(baseSettings);

export const staticSettings = {
    version: settingsConfig.version,
    name: settingsConfig.name,
    appBar: defaultSettingsProvider.appBar,
    footer: defaultSettingsProvider.footer,
    layout: defaultSettingsProvider.layout,
    navHidden: defaultSettingsProvider.navHidden,
    lastLayout: defaultSettingsProvider.lastLayout,
    toastPosition: defaultSettingsProvider.toastPosition
}
