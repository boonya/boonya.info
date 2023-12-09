import NextImage, { ImageProps } from 'next/image';
import deepmerge from 'deepmerge';

export default function Image(props: ImageProps) {
  // @ts-expect-error Ok so far.
  const src = props.src.replace(/^assets\//u, '/assets/');
  // const newProps = deepmerge(
  //   {
  //     style: { objectFit: 'contain' },
  //     width: 1200,
  //     height: 800,
  //   },
  //   props,
  // );
  // return <NextImage {...newProps} src={src} />;
  return <img {...props} src={src} />;
}
