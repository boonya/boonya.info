import '@/styles/globals.css';

// These styles apply to every route in the application
import useGoogleAnalytics from '@/hooks/useGoogleAnalytics';
import type {AppProps} from 'next/app';
import {FaroErrorBoundary} from '@grafana/faro-react';
import useFaroCollector from '@/hooks/useFaroCollector';

export default function App({Component, pageProps}: AppProps<Record<string, unknown>>) {
  useFaroCollector();
  useGoogleAnalytics();

  return (
    <FaroErrorBoundary>
      <Component {...pageProps} />
    </FaroErrorBoundary>
  );
}
