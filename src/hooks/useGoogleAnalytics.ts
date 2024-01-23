'use client';

import { useEffect } from 'react';
import ReactGA from 'react-ga4';

declare global {
  interface Window {
    readonly __APP_GOOGLE_ANALYTICS_ID?: string;
  }
}

export default function useGoogleAnalytics() {
  const value = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?.trim();

  useEffect(() => {
    // @ts-expect-error This is where we set the value.
    window.__APP_GOOGLE_ANALYTICS_ID = value;
    Object.freeze(window.__APP_GOOGLE_ANALYTICS_ID);

    if (value) {
      ReactGA.initialize(value);
    }
  }, [value]);
}
