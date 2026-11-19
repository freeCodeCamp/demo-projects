const relativeTimeFormatter = new Intl.RelativeTimeFormat(undefined, {
  numeric: 'auto'
});

const DIVISIONS: { amount: number; unit: Intl.RelativeTimeFormatUnit }[] = [
  { amount: 60, unit: 'seconds' },
  { amount: 60, unit: 'minutes' },
  { amount: 24, unit: 'hours' },
  { amount: 7, unit: 'days' },
  { amount: 4.34524, unit: 'weeks' },
  { amount: 12, unit: 'months' },
  { amount: Number.POSITIVE_INFINITY, unit: 'years' }
];

// Due dates/timestamps are stored in UTC (per the Edge Case Decisions doc) —
// these helpers just render them in the viewer's local time zone, which
// `Intl`/`Date` already do by default.
export function formatRelativeTime(isoDate: string): string {
  let duration = (new Date(isoDate).getTime() - Date.now()) / 1000;

  for (const division of DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return relativeTimeFormatter.format(Math.round(duration), division.unit);
    }
    duration /= division.amount;
  }

  return relativeTimeFormatter.format(Math.round(duration), 'years');
}

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function isOverdue(dueDateIso: string | null): boolean {
  if (!dueDateIso) return false;
  return new Date(dueDateIso).getTime() < Date.now();
}

// "in_progress" -> "In Progress", "on_hold" -> "On Hold", etc. — every status/
// priority enum in this app is a snake_case string, so one helper covers all of
// them rather than a lookup table per enum.
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB'];
  let value = bytes / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(1)} ${units[unitIndex]}`;
}

export function formatEnumLabel(value: string): string {
  return value
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
