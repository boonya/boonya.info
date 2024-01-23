import Giscus from '@giscus/react';
import {z} from 'zod';

const schema = z.object({
  repo: z.custom<`${string}/${string}`>((v) => {
    return typeof v === 'string' ? /^[^\/]+\/[^\/]+$/iu.test(v) : false;
  }),
  repoId: z.string(),
  category: z.string(),
  categoryId: z.string(),
});

export default function Comments() {
  try {
    const env = {
      repo: process.env.NEXT_PUBLIC_REPO,
      repoId: process.env.NEXT_PUBLIC_REPO_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
    };
    const {repo, repoId, category, categoryId} = schema.parse(env);

    return (
      <Giscus
        repo={repo}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping="title"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="preferred_color_scheme"
        lang="uk"
      />
    );
  } catch (err) {
    console.groupCollapsed('Failed to load "giscus" comments.');
    console.error(err);
    console.groupEnd();
    return null;
  }
}
