import { ReactNode, useMemo } from 'react';
import { FalsyValue } from '@digital-wolf/types';

interface SharedIfProps {
  children: ReactNode;
  If?: unknown;
  Fallback?: ReactNode;
  Else?: ReactNode;
}

export function UiHelpersIf({ children, If, Fallback }: SharedIfProps): typeof If extends FalsyValue ? typeof Fallback : typeof children {
  const ifValue = Boolean(If);

  return useMemo<ReactNode>(() => {
    if (ifValue) return children;
    return Fallback;
  }, [Fallback, children, ifValue]);
}
