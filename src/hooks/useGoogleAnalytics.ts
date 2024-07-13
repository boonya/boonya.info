'use client';

import {GOOGLE_ANALYTICS_ID} from '@/utils/constants';
import {useEffect} from 'react';
import ReactGA from 'react-ga4';

declare global {
  interface Window {
    readonly __APP_GOOGLE_ANALYTICS_ID?: string;
  }
}

export default function useGoogleAnalytics() {
  const value = GOOGLE_ANALYTICS_ID;

  useEffect(() => {
    Object.defineProperty(window, '__APP_GOOGLE_ANALYTICS_ID', {
      writable: false,
      value,
    });
    if (value) {
      ReactGA.initialize(value);
    }
  }, [value]);
}
