import {
  format as formatDate,
  formatRelative,
  formatDistance,
  isDate,
  Locale,
} from 'date-fns';

function sanitizeDateValue(value?: Date) {
  if (value !== undefined && !isDate(value)) {
    throw new TypeError('The value is not a Date object.');
  }
  if (value === undefined) {
    return new Date();
  }
  return value;
}

const PATTERNS = {
  'relative': 'relative',
  'distance': 'distance',
  'date.long': 'PPP',
  'date.short': 'P',
  'time.short': 'p',
  'dateTime.medium': 'PPp',
} as const;

export type Format = keyof typeof PATTERNS | (string & {});

export default function date(format: Format, value?: Date, locale?: Locale) {
  const dateObject = sanitizeDateValue(value);
  switch (format) {
    case 'relative':
      return formatRelative(dateObject, new Date(), {locale});
    case 'distance':
      return formatDistance(dateObject, new Date(), {locale, addSuffix: true});
    default:
      // TODO: To figure out why
      // @ts-ignore
      const pattern = PATTERNS[format] || format;
      return formatDate(dateObject, pattern, {locale});
  }
}
