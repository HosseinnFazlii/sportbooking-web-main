import { useEffect, ReactNode, useMemo } from 'react'
import { Direction as MuiDirection } from '../../foundations';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import stylisRTLPlugin from 'stylis-plugin-rtl';

interface DirectionProps {
  children: ReactNode
  direction: MuiDirection
}

export const LayoutDirection = (props: DirectionProps) => {
  const { children, direction } = props

  const rtlCache = useMemo(() => {
    if (direction === 'rtl') {
      return createCache({
        key: 'rtl',
        prepend: true,
        stylisPlugins: [stylisRTLPlugin]
      });
    }
    return null;
  }, [direction]);

  useEffect(() => {
    document.dir = direction;
    document.documentElement.dir = direction;
    document.body.style.direction = direction;
  }, [direction]);

  if (rtlCache) {
    return <CacheProvider value={rtlCache}>{children}</CacheProvider>
  }
  
  return children
}