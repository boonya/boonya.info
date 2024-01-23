import {getPages} from '@/utils/read-articles';
import ShortArticle from '@/components/ShortArticle';
import RootLayout from '@/components/RootLayout';
import Pagination from '@/components/Pagination';
import pkg from '../../package.json';

type Props = Awaited<ReturnType<typeof getStaticProps>>['props'];

export default function Page({articles, totalPages}: Props) {
  const children = articles.map(({permalink, date, ...rest}) => (
    <ShortArticle key={permalink} date={new Date(date)} permalink={permalink} {...rest} />
  ));

  return (
    <RootLayout>
      <header>
        <h1>{pkg.description}</h1>
      </header>
      <main>
        {children}
        {totalPages > 1 && <Pagination total={totalPages} />}
      </main>
    </RootLayout>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  const pages = getPages();
  const articles = [...pages].pop()!;

  return {
    props: {
      articles,
      totalPages: pages.length,
    },
  };
}
