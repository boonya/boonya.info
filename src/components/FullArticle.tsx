import Markdown from '@/components/Markdown';
import Time from './Time';

type Props = {
  date: Date;
  md: string;
};

export default function FullArticle({ date, md }: Props) {
  return (
    <article>
      <Time value={date} withDistance />
      <Markdown value={md} topLevelHeading={2} />
    </article>
  );
}
