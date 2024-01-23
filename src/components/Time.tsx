import formatDate, {Format} from '@/utils/formatDate';

type Props = {
  value?: Date;
  format?: Format;
  withDistance?: boolean;
};

export default function Time({value, format, withDistance}: Props) {
  const date = formatDate(format || 'date.long', value);
  const distance = withDistance ? `(${formatDate('distance', value)})` : null;

  const children = [date, distance].filter(Boolean).join(' ');

  return (
    <time dateTime={formatDate('yyyy-MM-dd', value)} className="text-xs">
      {children}
    </time>
  );
}
