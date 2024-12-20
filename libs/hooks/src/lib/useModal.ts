'use client';

import { useState } from 'react';

export function useModal<P = null>(): Modal<P> {
  const [isOpen, setIsOpen] = useState(false);
  const [param, setParam] = useState<P | null>(null);

  function open(param?: P) {
    setIsOpen(true);
    setParam(param ?? null);
  }

  function close() {
    setIsOpen(false);
    setParam(null);
  }

  return {
    open,
    close,
    isOpen,
    current: param,
  };
}

export interface Modal<P = null> {
  open: (param?: P) => void;
  close: () => void;
  isOpen: boolean;
  current: P | null;
}
