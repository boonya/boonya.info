// These styles apply to every route in the application
import useGoogleAnalytics from '@/hooks/useGoogleAnalytics';
import '@/styles/globals.css';
import type {AppProps} from 'next/app';

export default function App({Component, pageProps}: AppProps<Record<string, unknown>>) {
  useGoogleAnalytics();

  return <Component {...pageProps} />;
}
