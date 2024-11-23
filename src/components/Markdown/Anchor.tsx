import Link from 'next/link';

export default function Anchor({href, children, title, ...props}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const _href = href || '#';
  const target = /^[a-z]{1,10}:\/\//iu.test(_href) ? '_blank' : undefined;

  return (
    <Link title={title ?? (children as string)} {...props} href={href || '#'} target={target}>
      {children}
    </Link>
  );
}
