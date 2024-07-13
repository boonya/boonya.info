import fs from 'fs';
import RSS from 'rss';
import {ORIGIN} from '@/utils/constants';
import pkg from '../../package.json';

type Article = {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
};

export default async function generateRssFeed(articles: Article[]) {
  const feed = new RSS({
    title: pkg.name,
    description: pkg.description,
    site_url: ORIGIN,
    feed_url: `${ORIGIN}/rss.xml`,
    // image_url: `${ORIGIN}/logo.jpeg`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  });

  // Add each individual post to the feed.
  articles.map(({title, description, url, publishedAt}) => {
    feed.item({
      title,
      description,
      url: ORIGIN + url,
      date: publishedAt,
    });
  });

  // Write the RSS feed to a file as XML.
  fs.writeFileSync('./public/rss.xml', feed.xml({indent: true}));
}
