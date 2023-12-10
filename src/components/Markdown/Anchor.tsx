import Link from 'next/link';

export default function Anchor({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const _href = href || '#';
  const target = /^[a-z]{1,10}:\/\//iu.test(_href) ? '_blank' : undefined;
  return <Link {...props} href={href || '#'} target={target} />;
}
