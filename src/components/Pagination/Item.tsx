import Link from 'next/link';

type Props = {
  index: boolean;
  number: number;
  label: string | number;
  current: number | null;
};

export default function Item({index, number, label, current}: Props) {
  const ariaCurrent = (index && !current) || current === number;
  const href = index ? `/` : `/page/${number}`;
  return (
    <li>
      <Link aria-current={ariaCurrent} href={href}>
          {label}
      </Link>
    </li>
  );
}
