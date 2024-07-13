'use client';

import {useEffect, useRef} from 'react';
import {getWebInstrumentations, initializeFaro} from '@grafana/faro-web-sdk';
import {TracingInstrumentation} from '@grafana/faro-web-tracing';
import {type Faro} from '@grafana/faro-react';
import pkg from '@/../package.json';
import {ENVIRONMENT, FARO_COLLECTOR_URL} from '@/utils/constants';

declare global {
  interface Window {
    readonly __APP_FARO_COLLECTOR_URL?: string;
    readonly __APP_ENVIRONMENT?: string;
  }
}

export default function useFaroCollector() {
  const url = FARO_COLLECTOR_URL;
  const environment = ENVIRONMENT;

  const faro = useRef<Faro | null>(null);

  useEffect(() => {
    Object.defineProperty(window, '__APP_FARO_COLLECTOR_URL', {
      writable: false,
      value: url,
    });

    Object.defineProperty(window, '__APP_ENVIRONMENT', {
      writable: false,
      value: environment,
    });

    if (url && !faro.current) {
      faro.current = initializeFaro({
        url,
        app: {
          name: pkg.name,
          version: pkg.version,
          environment,
        },
        instrumentations: [
          // Mandatory, overwriting the instrumentations array would cause the default instrumentations to be omitted
          ...getWebInstrumentations(),

          // Initialization of the tracing package.
          // This packages is optional because it increases the bundle size noticeably. Only add it if you want tracing data.
          new TracingInstrumentation(),
        ],
      });
    }

    return () => {
      faro.current = null;
    };
  }, [environment, url]);

  return faro.current;
}
