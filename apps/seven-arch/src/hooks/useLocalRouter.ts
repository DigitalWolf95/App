'use client';

import { usePathname, useRouter } from 'next/navigation';
import path from 'path';
import { useMemo } from 'react';
import { adminDrawerItems, mainDrawerItems } from '../constants/mainDrawerItems';

export function useLocalRouter() {
  const { push } = useRouter();
  const pathname = usePathname();

  const isAdminPage = useMemo(() => {
    return pathname.startsWith('/admin');
  }, [pathname]);

  const isHomePage = useMemo(() => {
    return pathname === '/';
  }, [pathname]);

  const currentRoute = useMemo(() => {
    return [...mainDrawerItems, ...adminDrawerItems].find((item) => {
      return path.join(item.to) === pathname;
    });
  }, [pathname]);

  return { push, isAdminPage, isHomePage, currentRoute };
}
