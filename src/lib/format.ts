import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date: string | Date, pattern = 'dd MMM, yyyy') => {
  return format(new Date(date), pattern);
};

export const formatDateTime = (date: string | Date) => {
  return format(new Date(date), 'dd MMM, yyyy \'at\' h:mm a');
};

export const formatRelativeTime = (date: string | Date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Parses a date-only ISO string (YYYY-MM-DD) into a Date in local timezone.
 * Using `new Date('2026-02-23')` alone creates UTC midnight which shifts
 * to the previous day in negative-offset timezones — this avoids that.
 */
export const parseDateFromISO = (isoDateStr: string): Date =>
  new Date(isoDateStr + 'T00:00:00');

/**
 * Converts a Date to a date-only ISO string (YYYY-MM-DD).
 * Uses local date parts so the string matches what the user sees on screen.
 */
export const formatDateToISO = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Locale-aware short date display.
 * Adapts to the user's browser locale automatically:
 *   en-US → "Feb 23, 2026"
 *   de-DE → "23. Feb. 2026"
 *   ja-JP → "2026年2月23日"
 */
export const formatDateShort = (date: Date): string =>
  new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
