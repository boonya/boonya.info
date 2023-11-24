import Head from 'next/head';
import { getArticles, getPages, getRedirects } from '@/utils/read-articles';
import Link from 'next/link';
import FullArticle from '@/components/FullArticle';
import RootLayout from '@/components/RootLayout';
import ListingPage from '@/pages/index';
import pkg from '../../package.json';

function Article({ title, md, ...props }: ReturnType<typeof getArticles>[number]) {
  const pageTitle = `${pkg.name} :: ${title}`;
  const date = new Date(props.date);

  return (
    <RootLayout title={pageTitle}>
      <header>
        <h1>{title}</h1>
        <Link href={'/'}>Go to main page</Link>
      </header>
      <main>
        <FullArticle date={date} md={md} />
      </main>
    </RootLayout>
  );
}

function Redirect({ to, title }: ReturnType<typeof getRedirects>[number]) {
  return (
    <RootLayout title={title}>
      <Head>
        <meta http-equiv="refresh" content={`0; url=${to}`} />
        <title>{title}</title>
      </Head>
      <main>
        <a href={to}>Click here to go to &quot;{title}&quot;.</a>
      </main>
    </RootLayout>
  );
}

type Props = Awaited<ReturnType<typeof getStaticProps>>['props'];

export default function Page({ article, redirect, currentPage, totalPages }: Props) {
  if (currentPage) {
    return <ListingPage articles={currentPage} totalPages={totalPages} />;
  }
  if (article) {
    return <Article {...article} />;
  }
  if (redirect) {
    return <Redirect {...redirect} />;
  }
  throw new Error('No article, no page, no redirect found.');
}

export async function getStaticPaths() {
  function createSlug(value: string) {
    return value.replace(/^\//u, '').split('/');
  }

  const pages = getPages().map((_, index) => createSlug(`/page/${index + 1}`));
  pages.pop();

  const articles = getArticles().map(({ permalink }) => createSlug(permalink));
  const redirects = getRedirects().map(({ from }) => createSlug(from));

  const paths = [...pages, ...articles, ...redirects].map((slug) => ({
    params: { slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

type GetStaticPropsArgs = Awaited<ReturnType<typeof getStaticPaths>>['paths'][number];

// This also gets called at build time
export async function getStaticProps({ params }: GetStaticPropsArgs) {
  const currentRoute = '/' + params.slug.join('/');

  const pages = getPages();
  const [, number] = currentRoute.match(/^\/page\/(\d+)/iu) || [];
  const currentPage = number ? pages[Number(number) - 1] : null;

  const article = getArticles().find(({ permalink }) => permalink === currentRoute) || null;
  const redirect = getRedirects().find(({ from }) => from === currentRoute) || null;

  if (!article && !redirect && !currentPage) {
    throw new Error('No article, no page, no redirect found.');
  }

  // Pass post data to the page via props
  return {
    props: {
      article,
      redirect,
      currentPage,
      totalPages: pages.length,
    },
  };
}
