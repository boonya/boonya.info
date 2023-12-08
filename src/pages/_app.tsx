// These styles apply to every route in the application
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';

export default function App({ Component, pageProps }: AppProps<Record<string, unknown>>) {
  useEffect(() => {
    const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?.trim();

    console.log('GOOGLE_ANALYTICS_ID:', GOOGLE_ANALYTICS_ID);
    console.log('NODE_ENV:', process.env.NODE_ENV);

    if (GOOGLE_ANALYTICS_ID) {
      ReactGA.initialize(GOOGLE_ANALYTICS_ID);
    }
  }, []);
  return <Component {...pageProps} />;
}
