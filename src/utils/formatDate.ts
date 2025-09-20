import {
  format as formatDate,
  formatDistanceToNow,
  formatRelative,
  isDate,
  type Locale,
} from 'date-fns';
import {uk} from 'date-fns/locale/uk';

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
  relative: 'relative',
  distance: 'distance',
  'date.long': 'PPP',
  'date.short': 'P',
  'time.short': 'p',
  'time.long': 'pp',
  'dateTime.medium': 'PPp',
} as const;

export type Format = keyof typeof PATTERNS | (string & {});

export default function date(
  format: Format,
  value?: Date,
  locale: Locale = uk,
) {
  const dateObject = sanitizeDateValue(value);
  switch (format) {
    case 'relative':
      return formatRelative(dateObject, new Date(), {locale});
    case 'distance':
      return formatDistanceToNow(dateObject, {
        locale,
        addSuffix: true,
      });
    default: {
      // @ts-expect-error It's okay. It gonna work.
      const pattern = PATTERNS[format] || format;
      return formatDate(dateObject, pattern, {locale});
    }
  }
}
