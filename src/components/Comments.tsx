'use client';

import Giscus from '@giscus/react';

export default function Comments() {
  // FIXME: Avoid hardcoded values [#25](https://github.com/boonya/boonya.info/issues/25)
  return (
    <Giscus
      repo={'boonya/boonya.info'} // 👈 should be env var
      repoId={'MDEwOlJlcG9zaXRvcnkyODMxMjkyNg=='} // 👈 should be env var
      category={'Blog'} // 👈 should be env var
      categoryId={'DIC_kwDOAbAFXs4CcpKP'} // 👈 should be env var
      mapping="title"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="preferred_color_scheme"
      lang="uk"
    />
  );
}
