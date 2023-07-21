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

const SHORT_TIMESTAMP_FORMATTER = new Intl.DateTimeFormat(undefined, {
  timeStyle: 'short'
});

const LONG_TIMESTAMP_FORMATTER = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'short'
});

type TimestampProps = Pick<Timestamp, 'seconds' | 'nanoseconds'>;

/**
 * Get a formatted date from a Firestore timestamp.
 *
 * @param timestampProps The timestamp to format.
 * @returns A formatted date string.
 */
export function formatTimestamp(timestamp: TimestampProps): string {
  const date = getDateFromTimestamp(timestamp);

  if (dateIsToday(date))
    return `Today at ${SHORT_TIMESTAMP_FORMATTER.format(date)}`;

  if (dateIsYesterday(date))
    return `Yesterday at ${SHORT_TIMESTAMP_FORMATTER.format(date)}`;

  return LONG_TIMESTAMP_FORMATTER.format(date);
}

const FULL_TIMESTAMP_FORMATTER = new Intl.DateTimeFormat(undefined, {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
});

/**
 * Get a full formatted date from a Firestore timestamp.
 *
 * @param timestamp The timestamp to format.
 * @returns A formatted date string.
 */
export function formatFullTimeStamp(timestamp: TimestampProps): string {
  const date = getDateFromTimestamp(timestamp);

  return FULL_TIMESTAMP_FORMATTER.format(date);
}

/**
 * Returns a converted date from a Firestore timestamp.
 */
function getDateFromTimestamp({ seconds, nanoseconds }: TimestampProps): Date {
  const miliseconds = seconds * 1000 + nanoseconds / 1_000_000;
  const date = new Date(miliseconds);

  return date;
}

/**
 * Returns a boolean whether the given date is today.
 */
function dateIsToday(date: Date): boolean {
  return new Date().toDateString() === date.toDateString();
}

/**
 * Returns a boolean whether the given date is yesterday.
 */
function dateIsYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return yesterday.toDateString() === date.toDateString();
}
