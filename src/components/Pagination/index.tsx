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

  return (
    <nav aria-label="Page navigation" className="pagination">
      <ul>
        {array.map((number, index) => (
          <Item
            key={number}
            index={index === 0}
            current={current}
            number={number}
          />
        ))}
      </ul>
    </nav>
  );
}
