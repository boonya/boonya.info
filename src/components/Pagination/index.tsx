import Item from './Item';
import useCurrentNumber from './useCurrentNumber';

type Props = {
  total: number;
};

export default function Pagination({ total }: Props) {
  const current = useCurrentNumber(total);

  const numbers = Object.keys(Array<null>(total).fill(null))
    .map((v) => Number(v) + 1)
    .toReversed();

  const isFirst = !current || current === numbers.at(0);
  const isLast = current === numbers.at(-1);

  const prev = isFirst ? null : (current && current + 1) || numbers.at(0);
  const next = isLast ? null : (current && current - 1) || numbers.at(1);

  return (
    <nav aria-label="Page navigation" className="flex justify-center">
      <ul className="flex list-none justify-center gap-8 p-0">
        {prev && <Item isFirst={numbers.at(1) === current} number={prev} label={'<'} />}
        {numbers.map((number, index) => (
          <Item key={number} isFirst={index === 0} isCurrent={number === current} number={number} label={number} />
        ))}
        {next && <Item number={next} label={'>'} />}
      </ul>
    </nav>
  );
}
