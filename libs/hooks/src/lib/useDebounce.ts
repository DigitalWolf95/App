'use client';

import { useState } from 'react';

export function useDebounce(timeout: number) {
  const [session, setSession] = useState<number | null>(null);

  function stopDebounce() {
    if (!session) return;
    clearTimeout(session);
    setSession(null);
  }

  function debounce(callback: () => void) {
    if (session) {
      stopDebounce();
    }
    setSession(
      setTimeout(() => {
        callback();
        setSession(null);
      }, timeout) as unknown as number
    );
  }

  return { debounce, session, stopDebounce };
}
