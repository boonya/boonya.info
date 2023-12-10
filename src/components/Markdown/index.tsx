import MarkdownToJsx from 'markdown-to-jsx';
import Image from './Image';
import { HTMLAttributes, PropsWithChildren } from 'react';
import slugify from 'slugify';
import Code from './Code';
import Anchor from './Anchor';

type MarkdownProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  noImages?: boolean;
};

export default function Markdown({ value, noImages }: MarkdownProps) {
  const overrides = {
    a: Anchor,
    img: noImages ? () => null : Image,
    pre: ({ children }: PropsWithChildren) => children,
    code: Code,
  };

  return (
    <MarkdownToJsx
      options={{
        slugify: (value) => slugify(value, { lower: true }),
        disableParsingRawHTML: true,
        overrides,
        wrapper: ({ children }) => <div className="overflow-hidden">{children}</div>,
      }}
    >
      {value}
    </MarkdownToJsx>
  );
}
