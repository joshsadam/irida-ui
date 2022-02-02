/**
 * Formats a Date into a standardized and localized string
 * @param {Date} date - The date to format
 * @param {string} [locale=en-CA] - The locale to format the date to.
 */
export function formatTimeStamp(
  date: Date,
  locale: string | string[] = 'en-CA',
): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
}
