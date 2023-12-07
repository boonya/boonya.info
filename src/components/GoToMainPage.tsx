import Link from 'next/link';

export default function GoToMainPage() {
  return (
    <Link href={'/'} className="text-xs">
      Go to main page
    </Link>
  );
}
