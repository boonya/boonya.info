import {isToday} from 'date-fns';
import formatDate, {type Format} from '@/utils/formatDate';

type Props = {
  value?: Date;
  format?: Format;
  withDistance?: boolean;
};

export default function Time(props: Props) {
  const {
    value = new Date(),
    format = 'date.long',
    withDistance,
    ...restProps
  } = props;

  const date = formatDate(format, value);
  const distance =
    withDistance && !isToday(value)
      ? `(${formatDate('distance', value)})`
      : null;

  const label = [date, distance].filter(Boolean).join(' ');

  return (
    <time
      dateTime={formatDate('yyyy-MM-dd', value)}
      className="text-xs"
      {...restProps}
    >
      {label}
    </time>
  );
}
