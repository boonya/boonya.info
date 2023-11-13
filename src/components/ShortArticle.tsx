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
  const [intro] = md.split(/<!--\s*more\s*-->/um);
  return (
    <article>
      <h1><Link href={permalink}>{title}</Link></h1>
      <Time value={date} withDistance />
      <Markdown value={intro} topLevelHeading={2} noImages />
    </article>
  );
}
