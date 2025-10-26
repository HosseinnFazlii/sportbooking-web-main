import { ReactNode } from 'react'
import { Direction } from '../../foundations'
import { SkinType, ModeType, AppBarType, FooterType, ThemeColorType, ContentWidthType, VerticalNavToggleType, PositionType, LayoutDirectionType } from '../../layouts'
import * as dateFnsGregorian from 'date-fns'; // Gregorian
import * as dateFnsJalali from 'date-fns-jalali'; // Jalali

export type CalendarType = 'gregorian' | 'jalali';
export type DateFnsModule = typeof dateFnsGregorian | typeof dateFnsJalali;

export type LanguageCode = 'en' | 'fa';

export type Settings = {
    name: string;
    version: string;
    apiHost: string;
    language: LanguageCode;
    calendar: CalendarType;
    skin: SkinType;
    mode: ModeType;
    appBar?: AppBarType;
    footer?: FooterType;
    navHidden?: boolean; // navigation menu
    appBarBlur: boolean;
    direction: Direction;
    navCollapsed: boolean;
    themeColor: ThemeColorType;
    contentWidth: ContentWidthType;
    layout?: LayoutDirectionType;
    lastLayout?: LayoutDirectionType;
    verticalNavToggleType: VerticalNavToggleType;
    toastPosition?: PositionType;
    dateUtils: DateFnsModule;
}

export type PageSpecificSettings = {
    skin?: SkinType;
    mode?: ModeType;
    appBar?: AppBarType;
    footer?: FooterType;
    language?: LanguageCode;
    navHidden?: boolean; // navigation menu
    appBarBlur?: boolean;
    direction?: Direction;
    navCollapsed?: boolean;
    themeColor?: ThemeColorType;
    contentWidth?: ContentWidthType;
    layout?: LayoutDirectionType;
    lastLayout?: LayoutDirectionType;
    verticalNavToggleType?: VerticalNavToggleType;
    toastPosition?: PositionType;
}
export type SettingsContextValue = {
    settings: Settings;
    saveSettings: (updatedSettings: Settings) => void;
}

export interface ISettingsProvider {
    children: ReactNode;
    pageSettings?: PageSpecificSettings | void;
}
