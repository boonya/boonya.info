import NextImage, {ImageProps} from 'next/image';

type Props = Omit<ImageProps, 'loader'>;

export default function Image({src, alt, ...props}: Props) {
  return (
    <NextImage
      {...props}
      // @ts-expect-error Ok so far.
      src={src.replace(/^assets\//u, '/assets/')}
      alt={alt || 'image'}
      width={1200}
      height={900}
    />
  );
}
