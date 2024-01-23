import Markdown from '@/components/Markdown';
import Time from './Time';
import GoToMainPage from '@/components/GoToMainPage';

type Props = {
  date: Date;
  md: string;
  title: string;
};

export default function FullArticle({title, date, md}: Props) {
  return (
    <article className="grid gap-5">
      <header>
        <h1>{title}</h1>
        <p>
          <GoToMainPage />
        </p>
        <Time value={date} withDistance />
      </header>
      <section className="overflow-hidden">
        <Markdown value={md} />
      </section>
    </article>
  );
}
