import * as dateFnsGregorian from 'date-fns';
import * as dateFnsJalali from 'date-fns-jalali';
import { CalendarType, DateFnsModule } from '../contexts/settings-context/types';

const dateFnsByCalendar: Record<CalendarType, DateFnsModule> = {
    gregorian: dateFnsGregorian,
    jalali: dateFnsJalali
};

let activeCalendar: CalendarType = 'gregorian';
let activeDateFns: DateFnsModule = dateFnsByCalendar[activeCalendar];

export const setActiveCalendar = (calendar: CalendarType): void => {
    if (calendar === activeCalendar) {
        return;
    }

    activeCalendar = calendar;
    activeDateFns = dateFnsByCalendar[calendar];
};

export const getActiveCalendar = (): CalendarType => activeCalendar;

export const getActiveDateFns = (): DateFnsModule => activeDateFns;

export const getDateFnsByCalendar = (calendar: CalendarType): DateFnsModule => dateFnsByCalendar[calendar];
