import { worker } from './browser';

export async function initMocks() {
  if (typeof window !== 'undefined') {
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
}