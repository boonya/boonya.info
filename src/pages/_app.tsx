// These styles apply to every route in the application
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';

export default function App({ Component, pageProps }: AppProps<Record<string, unknown>>) {
  useEffect(() => {
    ReactGA.initialize('396647624');
  }, []);
  return <Component {...pageProps} />;
}
