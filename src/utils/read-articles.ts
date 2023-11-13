import YAML from 'yaml';
import path from 'path';
import fs from 'fs';
import {z} from 'zod';

function transformRedirects(value: string | string[]) {
	if (typeof value === 'string') {
		return [value];
	}
	return value;
}

function parseContent(raw: string) {
  const match = raw.match(/^-{3,}\n(?<meta>[.\s\S]+?)(?=-{3,}\n)-{3,}\n(?<md>[.\s\S]+)/um);
  const {meta, md} = match?.groups || {};
  if (!meta || !md) {
    throw new Error('There is no valid content in this file.', {cause: {raw, match}});
  }

  const {permalink, title, redirect_from} = z.object({
    permalink: z.string().trim(),
    title: z.string().trim(),
    redirect_from: z.union([z.string(), z.string().array()]).transform(transformRedirects).optional(),
  }).parse(YAML.parse(meta));

  return {permalink, title, redirect_from, md};
}

function processFile(filename: string, baseDir: string) {
  try {
    const dateString = filename.match(/^(?<date>\d{4}-\d{2}-\d{2})/u)?.groups?.date;
    const date = z.string()
      .transform((v) => new Date(v))
      .parse(dateString);

    const file = path.join(baseDir, filename);
    const rawContent = fs.readFileSync(file).toString();
    return {date, ...parseContent(rawContent)};
  } catch (cause) {
    throw new Error(`"${filename}" processing has failed.`, {cause});
  }
}

type Article = ReturnType<typeof processFile>;

function sortByDate(a: Article, b: Article) {
  if (a.date < b.date) {
    return 1;
  }
  if (a.date > b.date) {
    return -1;
  }
  return 0;
}

function normalize(data: Article) {
  const {redirect_from, date, ...rest} = data;
  return {
    ...rest,
    redirectFrom: redirect_from?.join(',') || '',
    date: date.toISOString(),
  };
}

function readArticles() {
  const directory = path.join('articles');
  return fs.readdirSync(directory)
    .filter((v) => (/^\d{4}-\d{2}-\d{2}-.+\.md$/u).test(v))
    .map((filename) => processFile(filename, directory));
}

export function getArticles() {
  return readArticles()
    .toSorted(sortByDate)
    .map(normalize);
}

export function getRedirects() {
  type FromTo = {from: string; to: string, title: string};
  return readArticles()
    .reduce<FromTo[]>((acc, {redirect_from, permalink, title}) => [
      ...acc,
      ...redirect_from?.reduce<FromTo[]>((acc2, from) => [...acc2, {
        title,
        from,
        to: permalink
      }], []) || [],
    ], [])
}

export const PAGE_SIZE = 5;

export function getPages(pageSize = PAGE_SIZE) {
  const array = getArticles().toReversed();
  const pages = [];
  for (let i = 0; i < array.length; i += pageSize) {
      const chunk = array.slice(i, i + pageSize).toReversed();
      pages.push(chunk);
  }
  return pages;
}
