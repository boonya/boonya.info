import { HTMLAttributes } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { clsx } from 'clsx';

function parseLang(className?: string) {
  const lang = className?.replace('lang-', '');
  switch (lang) {
    case 'sh':
      return 'shell';
    case 'js':
      return 'javascript';
    default:
      return lang;
  }
}

type Props = HTMLAttributes<HTMLSpanElement> & { children: string };

export default function Code({ className, children, ...rest }: Props) {
  const lang = parseLang(className);

  if (!className) {
    return (
      <code className={className} {...rest}>
        {children}
      </code>
    );
  }

  return (
    <div className="relative">
      <SyntaxHighlighter
        language={lang}
        showLineNumbers
        useInlineStyles={false}
        className={clsx('mt-4 mb-4 overflow-auto bg-slate-100 rounded-md', className)}
      >
        {children}
      </SyntaxHighlighter>
      <button
        className="btn absolute top-0 right-0 text-sm"
        aria-label="Copy source to the clipboard"
        onClick={() => navigator.clipboard.writeText(children)}
      >
        Copy
      </button>
    </div>
  );
}
