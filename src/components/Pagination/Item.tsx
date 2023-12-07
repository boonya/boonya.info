import Link from 'next/link';
import React from 'react';

type Props = {
  isCurrent?: boolean;
  isFirst?: boolean;
  label: React.ReactNode;
  number: number;
};

export default function Item({ isFirst, isCurrent, number, label }: Props) {
  const href = isFirst ? `/` : `/page/${number}`;

  return (
    <li>
      <Link aria-current={isCurrent} href={href}>
        {label}
      </Link>
    </li>
  );
}
