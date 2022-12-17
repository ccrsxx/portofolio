const FORMATTER = new Intl.NumberFormat();

export function formatNumber(value: number): string {
  return FORMATTER.format(value);
}
