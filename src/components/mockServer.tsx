'use client';

import { useEffect, useState } from 'react';

export function StartMockWorker({children}: {children: React.ReactNode}) {
  const [isMockReady, setMockReady] = useState(false);

  useEffect(() => {
    async function enableMocks() {
      if (process.env.NODE_ENV === 'development') {
        const { initMocks } = await import('@/mock/initmock');
        await initMocks();
      }
      setMockReady(true);
    }

    enableMocks();
  }, []);

  if (!isMockReady) {
    return <div className="grid place-items-center min-h-screen"><div>Mocking ...</div></div>;
  }

  return <>{children}</> ;
}
