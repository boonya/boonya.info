import MarkdownToJsx from 'markdown-to-jsx';
import Image from './Image';
import Link from 'next/link';
import {HTMLAttributes, PropsWithChildren, useCallback} from 'react';
import slugify from 'slugify';
import Code from './Code';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type MarkdownProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  topLevelHeading?: HeadingLevel;
  noImages?: boolean;
};

export default function Markdown({
  value,
  topLevelHeading: _topLevelHeading,
  noImages
}: MarkdownProps) {
  const topLevelHeading = _topLevelHeading || 1;

  const heading = useCallback((level: number) => {
    const Component = `h${level}`;
    // eslint-disable-next-line react/display-name
    return (props: HTMLAttributes<HTMLHeadingElement>) => {
      return <Component {...props} />;
    }
  }, []);

  const overrides = {
    a: Link,
    img: noImages ? () => null : Image,
    pre: ({children}: PropsWithChildren) => children,
    code: Code,
    h1: heading(topLevelHeading),
    h2: heading(topLevelHeading + 1),
    h3: heading(topLevelHeading + 2),
    h4: heading(topLevelHeading + 3),
    h5: heading(topLevelHeading + 4),
    h6: heading(topLevelHeading + 5),
  };

  return (
    <MarkdownToJsx
      options={{
        slugify: (value) => slugify(value, {lower: true}),
        disableParsingRawHTML: true,
        overrides,
      }}
    >
      {value}
    </MarkdownToJsx>
  );
}
