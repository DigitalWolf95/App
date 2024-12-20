'use client';

import { useEffect, useRef, useState } from 'react';

export function useCounterDown(ms: number) {
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  function start() {
    setIsFinished(false);
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setIsFinished(true);
    }, ms);
  }

  useEffect(() => {
    start();
  }, []);

  return { isFinished, restart: start };
}
