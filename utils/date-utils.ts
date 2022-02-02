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
