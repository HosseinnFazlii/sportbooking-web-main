import { useMemo } from 'react';
import { useSettings } from './useSettings';

export const useDateUtils = () => {
    const { settings } = useSettings();

    return useMemo(() => {
        const dateFns = settings.dateUtils as typeof import('date-fns');

        return {
            calendar: settings.calendar,
            format: dateFns.format,
            parseISO: dateFns.parseISO,
            isValid: dateFns.isValid,
            addDays: dateFns.addDays,
            startOfDay: dateFns.startOfDay,
            getYear: dateFns.getYear,
            getMonth: dateFns.getMonth
        };
    }, [settings.calendar, settings.dateUtils]);
};
