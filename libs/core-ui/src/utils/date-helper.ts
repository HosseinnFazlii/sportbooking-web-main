import { getActiveDateFns } from './date-manager';

export const formatDate = (date: Date | number, formatString: string, options?: Parameters<typeof import('date-fns').format>[2]): string => {
    const dateFns = getActiveDateFns() as typeof import('date-fns');
    return dateFns.format(date, formatString, options as Parameters<typeof import('date-fns').format>[2]);
};

export const parseISODate = (value: string, options?: Parameters<typeof import('date-fns').parseISO>[1]): Date => {
    const dateFns = getActiveDateFns() as typeof import('date-fns');
    return dateFns.parseISO(value, options as Parameters<typeof import('date-fns').parseISO>[1]);
};

export const addDaysToDate = (date: Date | number, amount: number): Date => {
    const dateFns = getActiveDateFns() as typeof import('date-fns');
    return dateFns.addDays(date, amount);
};

export const startOfDayForDate = (date: Date | number): Date => {
    const dateFns = getActiveDateFns() as typeof import('date-fns');
    return dateFns.startOfDay(date);
};

export const isValidDate = (value: unknown): boolean => {
    const dateFns = getActiveDateFns() as typeof import('date-fns');
    return dateFns.isValid(value);
};

export const getYearFromDate = (date: Date | number): number => {
    const dateFns = getActiveDateFns() as typeof import('date-fns');
    return dateFns.getYear(date);
};

export const getMonthFromDate = (date: Date | number): number => {
    const dateFns = getActiveDateFns() as typeof import('date-fns');
    return dateFns.getMonth(date);
};

// Backward compatibility exports for existing imports
export const jalaliFormat = formatDate;
export const jalaliGetYear = getYearFromDate;
export const jalaliGetMonth = getMonthFromDate;
export const format = formatDate;
export const parseISO = parseISODate;
export const addDays = addDaysToDate;
export const startOfDay = startOfDayForDate;
export const isValid = isValidDate;
export const getYear = getYearFromDate;
export const getMonth = getMonthFromDate;
