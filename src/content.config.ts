import {defineCollection, z} from 'astro:content';
import {glob} from 'astro/loaders';

const HrefSchema = z
  .string()
  .startsWith('/')
  .transform((v) => v.replace(/^\//, '').replace(/\.html$/, ''));

const ArticleSchema = z.object({
  layout: z.enum(['post']).optional().default('post'),
  lang: z.enum(['uk' /** , 'ru', 'en'**/]).optional().default('uk'),
  draft: z.boolean().optional().default(false),
  title: z.string().trim().nonempty({message: 'Title is required.'}),
  description: z
    .string()
    .nonempty({message: 'Description is required.'})
    .max(160, {message: 'Description must be 160 characters or less.'}),
  keywords: z.string().trim().array().optional(),
  author: z.string().trim().optional(),
  createdAt: z.date(),
  updatedAt: z
    .union([z.date(), z.date().array()])
    .optional()
    .transform((v) => [v].flat().filter(Boolean)),
  permalink: HrefSchema,
  redirect_from: z
    .union([HrefSchema, HrefSchema.array()])
    .optional()
    .transform((v) => [v].flat().filter(Boolean)),
  tags: z.string().array().optional(),
});

const articles = defineCollection({
  loader: glob({pattern: '**/*.md', base: './articles'}),
  schema: ArticleSchema,
});

export const collections = {articles};
