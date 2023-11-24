import {useParams} from 'next/navigation';
import Item from './Item';

type Props = {
  length: number;
};

export default function Pagination({length}: Props) {
  const {slug} = useParams<{slug?: string[]}>() || {};

  const current = slug ? Number(slug.pop()) : null;
  const array = Object.keys(Array<null>(length).fill(null))
    .map((v) => Number(v) + 1)
    .toReversed();

  const isFirst = !current || current === array.at(0);
  const isLast = current === array.at(-1);
  const prev = isFirst ? null : current && current - 1 || array.at(0);
  const next = isLast ? null : current && current + 1 || array.at(1);

  return (
    <nav aria-label="Page navigation" className="flex justify-center">
      <ul className="flex justify-center gap-8">
        {prev && (
          <Item
              index
              current={current}
              number={prev}
              label={'<'}
          />
        )}
        {array.map((number, index) => (
          <Item
            key={number}
            index={index === 0}
            current={current}
            number={number}
            label={number}
          />
        ))}
        {next && (
          <Item
              index={false}
              current={current}
              number={next}
              label={'>'}
          />
        )}
      </ul>
    </nav>
  );
}
