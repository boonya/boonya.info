import {GISCUS_CATEGORY_ID, REPO, REPO_ID, GISCUS_CATEGORY} from '@/utils/constants';
import {logError} from '@/utils/logger';
import Giscus from '@giscus/react';

export default function Comments() {
  try {
    if (!REPO || !REPO_ID || !GISCUS_CATEGORY || !GISCUS_CATEGORY_ID) return null;

    return (
      <Giscus
        repo={REPO}
        repoId={REPO_ID}
        category={GISCUS_CATEGORY}
        categoryId={GISCUS_CATEGORY_ID}
        mapping="title"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="preferred_color_scheme"
        lang="uk"
      />
    );
  } catch (err) {
    logError('Failed to load "giscus" comments.')(err);
    return null;
  }
}
