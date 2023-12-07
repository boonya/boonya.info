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
        className={clsx('mb-4 mt-4 overflow-auto rounded-md bg-slate-100 dark:bg-cyan-950', className)}
      >
        {children}
      </SyntaxHighlighter>
      <button
        className="btn absolute right-0 top-0 text-sm"
        aria-label="Copy source to the clipboard"
        onClick={() => navigator.clipboard.writeText(children)}
      >
        Copy
      </button>
    </div>
  );
}
