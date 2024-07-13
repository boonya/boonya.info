import {optional, z} from 'zod';

export const ENVIRONMENT = z
  .enum(['production', 'development', 'test'])
  .default('production')
  .parse(process.env.NODE_ENV);

/**
 * The origin of the website.
 *
 * E.g. "https://boonya.info".
 */
export const ORIGIN = z
  .string()
  .url()
  .trim()
  .optional()
  .default('http://localhost:3000')
  .parse(process.env.NEXT_PUBLIC_ORIGIN);

export const FARO_COLLECTOR_URL = z.string().trim().optional().parse(process.env.NEXT_PUBLIC_FARO_COLLECTOR_URL);

export const GOOGLE_ANALYTICS_ID = z.string().trim().optional().parse(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID);

export const REPO = z.string().trim().optional().parse(process.env.NEXT_PUBLIC_REPO);
export const REPO_ID = z.string().trim().optional().parse(process.env.NEXT_PUBLIC_REPO_ID);
export const GISCUS_CATEGORY = z.string().trim().optional().parse(process.env.NEXT_PUBLIC_GISCUS_CATEGORY);
export const GISCUS_CATEGORY_ID = z.string().trim().optional().parse(process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID);
