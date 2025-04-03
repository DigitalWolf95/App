'use client'

import { useRouter, usePathname } from 'next/navigation';
import { useMemo } from 'react';

export function useLocalRouter() {
  const { push } = useRouter();
  const pathname = usePathname();

  const isAdminPage = useMemo(() => {
    console.log(pathname);
    return pathname.includes('admin');
  }, [pathname]);

  const isHomePage = useMemo(() => {
    return pathname === '/';
  }, [pathname]);

  // const currentRoute = useMemo(() => {
  //   return [...mainDrawerItems, ...adminDrawerItems].find((item) => {
  //     return path.join(item.to) === pathname;
  //   });
  // }, [pathname]);

  return { push, isAdminPage, isHomePage };
}
