/* eslint-disable no-console */
type Method = 'info' | 'warn' | 'error';
const logFunction = (method: Method) => (message: string) => (details?: unknown, additional?: unknown) => {
  console[method](message);
  if (!details) {
    return;
  }
  const label = details instanceof Error ? details.message : undefined;
  console.groupCollapsed(label);
  console.info({details, additional});
  console.groupEnd();
};
/* eslint-enable no-console */

export const logInfo = logFunction('info');
export const logWarn = logFunction('warn');
export const logError = logFunction('error');
