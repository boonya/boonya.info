import Markdown from '@/components//Markdown';
import Link from 'next/link';
import Time from './Time';

type Props = {
  permalink: string;
  title: string;
  date: Date;
  md: string;
};

export default function ShortArticle({permalink, title, date, md}: Props) {
  const [intro] = md.split(/<!--\s*more\s*-->/mu);

  return (
    <article>
      <h1>
        <Link href={permalink}>{title}</Link>
      </h1>
      <Time value={date} withDistance />
      <Markdown value={intro} noImages />
    </article>
  );
}
