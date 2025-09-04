---
layout: post
title: Додаємо RSS feed до nextjs SSG додатка
description: Як додати RSS канал до статичного сайту на Next.js використовуючи npm пакет rss для автоматичної генерації xml фіду.
createdAt: 2024-07-14
permalink: /blog/2024-07-13-rss-feed-nextjs.html
tags:
  - RSS
  - nextjs
---

[RSS](https://en.wikipedia.org/wiki/RSS) дозволяє користувачам підписатись на оновлення матеріалів вашого сайту і отримувати цю інформацію будь яким зручним для нього способом.

Про те як додати RSS feed до вашого сайту cтвореному на основі Nextjs я спробую описати в даному матеріалі.

<div style="max-width: 100px; margin: 1rem auto">

![RSS Icon](assets/rss-icon.svg)

</div>

<!--more-->

За для спрощення реалізації ми використаємо [npm модуль "rss"](https://www.npmjs.com/package/rss). То ж встановлюємо `npm i -S rss`, а також `npm i -D @types/rss`, якщо Typescript.

Далі необхідно створити фукцію що буде генерувати `rss.xml` файл в момент білда.

```ts
import fs from 'fs';
import RSS from 'rss';

type Article = {
  title: string;
  intro: string;
  permalink: string;
  publishedAt: string;
  keywords?: string[];
};

const ORIGIN = 'https://yourblog.com';

export default async function generateRssFeed(articles: Article[]) {
  const feed = new RSS({
    title: 'yourblog.com',
    description: 'Here I write something',
    site_url: ORIGIN,
    feed_url: `${ORIGIN}/rss.xml`,
    image_url: `${ORIGIN}/logo.jpeg`,
    generator: 'yourblog.com',
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  });

  // Add each individual post to the feed.
  articles.map(({title, intro, keywords, permalink, publishedAt}) => {
    feed.item({
      url: ORIGIN + permalink,
      title,
      description: intro,
      categories: keywords,
      date: publishedAt,
    });
  });

  // Write the RSS feed to a file as XML.
  fs.writeFileSync('./public/rss.xml', feed.xml({indent: true}));
}
```

і потім цю функцію викликаємо

```ts
// src/pages/index.tsx

// This function gets called at build time
export async function getStaticProps() {
  await generateRssFeed(getAllArticles());
  /** Do your job */
}
```

Також, для того щоб всякі rss рідери могли побачити що даний сайт надає rss feed, потрібно це задекларувати метатегом.

```tsx
import Head from 'next/head';

<Head>
  {/** other metatags */}
  <link rel="alternate" type="application/rss+xml" href="/rss.xml" title="My RSS feed" />
</Head>;
```

От, власне, і всьо.

## Джерела

- [Adding an RSS feed to your Next.js app](https://blog.logrocket.com/adding-rss-feed-next-js-app/)
- [Creating an RSS Feed in your Next.js Project](https://dev.to/promathieuthiry/creating-an-rss-feed-in-your-nextjs-project-20em)
- [How to Add a Sitemap & RSS Feed in Next.js App Router](https://spacejelly.dev/posts/how-to-add-a-sitemap-rss-feed-in-next-js-app-router)
- [Next.js: How to Build an RSS Feed](https://www.davegray.codes/posts/nextjs-how-to-build-an-rss-feed)
