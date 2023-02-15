import type { Timestamp } from 'firebase/firestore';

const NUMBER_FORMATTER = new Intl.NumberFormat();

/**
 * Returns a formatted number string with thousand separators.
 */
export function formatNumber(numberValue: number): string {
  return NUMBER_FORMATTER.format(numberValue);
}

const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'long'
});

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

const TIMESTAMP_FORMATTER = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'long',
  timeStyle: 'short'
});

type formatTimestampProps = Pick<Timestamp, 'seconds' | 'nanoseconds'>;

/**
 * Get a formatted date from a Firestore timestamp.
 *
 * @param formatTimestampProps The timestamp to format.
 * @returns A formatted date string.
 */
export function formatTimestamp({
  seconds,
  nanoseconds
}: formatTimestampProps): string {
  const miliseconds = seconds * 1000 + nanoseconds / 1_000_000;
  const date = new Date(miliseconds);

  return TIMESTAMP_FORMATTER.format(date);
}
