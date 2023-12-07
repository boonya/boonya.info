import { useParams } from 'next/navigation';

export default function useCurrentNumber(total: number) {
  const { slug } = useParams<{ slug?: string[] }>() || {};
  return slug ? Number(slug.pop()) : total;
}
