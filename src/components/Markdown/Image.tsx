import NextImage, {ImageProps} from 'next/image';
import deepmerge from 'deepmerge'

export default function Image(props: ImageProps) {
  const newProps = deepmerge({
    style: {objectFit: 'contain'},
    width: 1200,
    height: 800,
  }, props);

  return <NextImage {...newProps} />;
}
