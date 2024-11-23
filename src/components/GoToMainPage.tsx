import Link from 'next/link';

export default function GoToMainPage() {
  return (
    <Link href={'/'} className="text-xs">
      До головної сторінки
    </Link>
  );
}
