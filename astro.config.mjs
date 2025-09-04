// @ts-check
import {defineConfig, envField} from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import {loadEnv} from 'vite';
import {z} from 'astro/zod';

const NODE_ENV = z.enum(['development', 'production']).optional().parse(process.env.NODE_ENV) ?? 'production';
const env = loadEnv(NODE_ENV, process.cwd(), '');
const ORIGIN = z.string().url().parse(env.ORIGIN);
const PORT = z.coerce.number().min(1024).max(65535).optional().parse(env.PORT) ?? 4321;

// https://astro.build/config
export default defineConfig({
  site: ORIGIN,
  server: {port: PORT},
  integrations: [react(), mdx() /**, sitemap() */],
  vite: {
    // TODO: Figure it out later
    // @ts-ignore
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      NODE_ENV: envField.enum({
        context: 'server',
        access: 'public',
        values: ['development', 'production'],
        optional: true,
        default: 'production',
      }),
      PORT: envField.number({context: 'server', access: 'public', optional: true, default: 4321}),
      BUILD: envField.string({context: 'client', access: 'public'}),
      ENVIRONMENT: envField.string({context: 'client', access: 'public'}),
      ORIGIN: envField.string({context: 'client', access: 'public', url: true}),
      GISCUS_REPO: envField.string({context: 'client', access: 'public', optional: true}),
      GISCUS_REPO_ID: envField.string({context: 'client', access: 'public', optional: true}),
      GISCUS_CATEGORY: envField.string({context: 'client', access: 'public', optional: true}),
      GISCUS_CATEGORY_ID: envField.string({context: 'client', access: 'public', optional: true}),
      FARO_COLLECTOR_URL: envField.string({context: 'client', access: 'public', optional: true}),
      GOOGLE_ANALYTICS_ID: envField.string({context: 'client', access: 'public', optional: true}),
    },
  },
  /**
   * @link https://docs.astro.build/en/reference/configuration-reference/#image-options
   */
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
    responsiveStyles: true,
    layout: 'full-width',
    breakpoints: [640, 960, 1280, 1920, 2560],
  },
  /**
   * @link https://docs.astro.build/en/reference/configuration-reference/#buildformat
   */
  build: {
    assets: '_assets',
    format: 'file',
  },
  /**
   * @link https://docs.astro.build/en/reference/configuration-reference/#trailingslash
   */
  trailingSlashes: 'never',
});
