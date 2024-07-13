import RootLayout from '@/components/RootLayout';
import pkg from '@/../package.json';
import GoToMainPage from '@/components/GoToMainPage';

export default function Page() {
  return (
    <RootLayout>
      <header>
        <h1>{pkg.description}</h1>
      </header>
      <main>
        <section>
          <h1>Nothing found</h1>
          <GoToMainPage />
        </section>
      </main>
    </RootLayout>
  );
}
