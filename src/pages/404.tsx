import Link from "next/link";
import RootLayout from '@/components/RootLayout';
import pkg from '../../package.json';

export default function Page() {
  return (
    <RootLayout>
      <header>
        <h1>{pkg.description}</h1>
      </header>
      <main>
        <section>
          <h1>Nothing found</h1>
          <Link href={'/'}>Go to main page</Link>
        </section>
      </main>
    </RootLayout>
  );
}
