import {name, description, author, keywords} from '/package.json';
import {
  BUILD,
  ENVIRONMENT,
  ORIGIN,
  GISCUS_REPO,
  GISCUS_REPO_ID,
  GISCUS_CATEGORY,
  GISCUS_CATEGORY_ID,
  FARO_COLLECTOR_URL,
  GOOGLE_ANALYTICS_ID,
} from 'astro:env/client';

export default {
  build: BUILD,
  environment: ENVIRONMENT,
  // Absolute URL to the root of your published site, used for generating links and sitemaps.
  site: ORIGIN,
  // The name of your site, used in the title and for SEO.
  title: name,
  // The description of your site, used for SEO and RSS feed.
  description,
  keywords,
  // The author of the site, used in the footer, SEO, and RSS feed.
  author,
  // Configuration for Giscus comments.
  // To set up Giscus, follow the instructions at https://giscus.app/
  // You'll need a GitHub repository with discussions enabled and the Giscus app installed.
  // Take the values from the generated script tag at https://giscus.app and fill them in here.
  // IMPORTANT: Update giscus.json in the root of the project with your own website URL
  // If you don't want to use Giscus, set this to undefined.
  giscus:
    (GISCUS_REPO &&
      GISCUS_REPO_ID &&
      GISCUS_CATEGORY &&
      GISCUS_CATEGORY_ID && {
        repo: GISCUS_REPO,
        repoId: GISCUS_REPO_ID,
        category: GISCUS_CATEGORY,
        categoryId: GISCUS_CATEGORY_ID,
        reactionsEnabled: true, // Enable reactions on post itself
      }) ||
    (false as const),
  ga: (GOOGLE_ANALYTICS_ID && {id: GOOGLE_ANALYTICS_ID}) || (false as const),
  faro: (FARO_COLLECTOR_URL && {url: FARO_COLLECTOR_URL}) || (false as const),
  /**
   * @link https://docs.astro.build/en/reference/configuration-reference/#trailingslash
   */
  trailingSlashes: 'never',
};
