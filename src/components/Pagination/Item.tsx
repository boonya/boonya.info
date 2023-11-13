import Link from 'next/link';

type Props = {
  index: boolean;
  number: number;
  current: number | null;
};

export default function Item({index, number, current}: Props) {
  const ariaCurrent = (index && !current) || current === number;
  const href = index ? `/` : `/page/${number}`;
  return (
    <li>
      <Link aria-current={ariaCurrent} href={href}>
          {number}
      </Link>
    </li>
  );
}
