import NextImage, {ImageProps} from 'next/image';
import deepmerge from 'deepmerge';

export default function Image({src, alt, ...props}: ImageProps) {
  // @ts-expect-error Ok so far.
  const _src = src.replace(/^assets\//u, '/assets/');
  return <img {...props} alt={alt || 'image'} src={_src} />;
}
