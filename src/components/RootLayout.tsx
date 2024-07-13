import React, {PropsWithChildren} from 'react';
import Head from 'next/head';
import pkg from '@/../package.json';
import formatDate from '@/utils/formatDate';
import RssIcon from '@/icons/Rss';

type Props = PropsWithChildren<{
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
}>;

export default function RootLayout({children, ...props}: Props) {
  const title = props.title || pkg.description;
  const description = props.description || pkg.description;
  const keywords = props.keywords || pkg.keywords.join(', ');
  const author = props.author || pkg.author;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Head>
      {children}
      <footer className="flex w-full items-center gap-4 px-4">
        <div className="grow">
          <p>(c) boonya.info {formatDate('yyyy')}</p>
        </div>
        <a href="/rss.xml" rel="noreferrer" target="_blank" title="RSS feed" aria-label="RSS feed">
          <RssIcon />
        </a>
      </footer>
    </>
  );
}
