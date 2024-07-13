import fs from 'fs';
import RSS from 'rss';
import {ORIGIN} from '@/utils/constants';
import pkg from '@/../package.json';

type Article = {
  title: string;
  intro: string;
  keywords?: string[];
  permalink: string;
  date: string;
};

export default async function generateRssFeed(articles: Article[]) {
  const feed = new RSS({
    title: pkg.name,
    description: pkg.description,
    site_url: ORIGIN,
    feed_url: `${ORIGIN}/rss.xml`,
    // image_url: `${ORIGIN}/logo.jpeg`,
    generator: 'boonya.info',
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  });

  // Add each individual post to the feed.
  articles.map(({title, intro, keywords, permalink, date}) => {
    feed.item({
      url: ORIGIN + permalink,
      title,
      description: intro,
      categories: keywords,
      date,
    });
  });

  // Write the RSS feed to a file as XML.
  fs.writeFileSync('./public/rss.xml', feed.xml({indent: true}));
}
