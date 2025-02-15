import { useMediaQuery } from '@mui/material';

export function useScreenSize() {
  // Individual breakpoints
  const isXs = useMediaQuery('(max-width: 639px)');
  const isSm = useMediaQuery('(min-width: 640px) and (max-width: 767px)');
  const isMd = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isLg = useMediaQuery('(min-width: 1024px) and (max-width: 1279px)');
  const isXl = useMediaQuery('(min-width: 1280px) and (max-width: 1535px)');
  const is2Xl = useMediaQuery('(min-width: 1536px)');

  // Combined ranges (and up)
  const isSmAndUp = useMediaQuery('(min-width: 640px)');
  const isMdAndUp = useMediaQuery('(min-width: 768px)');
  const isLgAndUp = useMediaQuery('(min-width: 1024px)');
  const isXlAndUp = useMediaQuery('(min-width: 1280px)');
  const is2XlAndUp = useMediaQuery('(min-width: 1536px)');

  // Combined ranges (and down)
  const isSmAndDown = useMediaQuery('(max-width: 767px)');
  const isMdAndDown = useMediaQuery('(max-width: 1023px)');
  const isLgAndDown = useMediaQuery('(max-width: 1279px)');
  const isXlAndDown = useMediaQuery('(max-width: 1535px)');

  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    isSmAndUp,
    isMdAndUp,
    isLgAndUp,
    isXlAndUp,
    is2XlAndUp,
    isSmAndDown,
    isMdAndDown,
    isLgAndDown,
    isXlAndDown,
  };
}
