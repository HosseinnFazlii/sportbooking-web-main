import { settingsConfig } from '../../configs';
import { CalendarType, DateFnsModule, LanguageCode, Settings } from './types';
import * as dateFnsGregorian from 'date-fns';
import * as dateFnsJalali from 'date-fns-jalali';

const calendarByLanguage: Record<LanguageCode, CalendarType> = {
    en: 'gregorian',
    fa: 'jalali'
};

const dateFnsByCalendar: Record<CalendarType, DateFnsModule> = {
    gregorian: dateFnsGregorian,
    jalali: dateFnsJalali
};

const directionByCalendar: Record<CalendarType, Settings['direction']> = {
    gregorian: 'ltr',
    jalali: 'rtl'
};

export const getCalendarByLanguage = (language: LanguageCode | undefined): CalendarType => {
    if (!language) {
        return calendarByLanguage[settingsConfig.defaultLanguage as LanguageCode];
    }

    return calendarByLanguage[language] ?? calendarByLanguage[settingsConfig.defaultLanguage as LanguageCode];
};

export const resolveDateUtils = (calendar: CalendarType): DateFnsModule => dateFnsByCalendar[calendar];

export const ensureDirectionForCalendar = (calendar: CalendarType): Settings['direction'] => directionByCalendar[calendar];

export const applyDerivedSettings = (settings: Settings): Settings => {
    const language = settings.language ?? settingsConfig.defaultLanguage as LanguageCode;
    const calendar = getCalendarByLanguage(language);
    const direction = ensureDirectionForCalendar(calendar);
    const dateUtils = resolveDateUtils(calendar);

    return {
        ...settings,
        language,
        calendar,
        direction,
        dateUtils
    };
};
