const NUMBER_FORMATTER = new Intl.NumberFormat();

const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

/**
 * Get a formatted number with period / commas.
 *
 * @param numberValue unformatted number.
 * @returns a formatted number.
 */
export function formatNumber(numberValue: number): string {
  return NUMBER_FORMATTER.format(numberValue);
}

/**
 * Get a formatted date string.
 *
 * @param dateString a string in `YYYY-MM-DD` format.
 * @returns a formatted date string.
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return DATE_FORMATTER.format(date);
}
