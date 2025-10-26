'use client';
import { Box, BoxProps, styled } from '../../../foundations';
import { useSettings } from '../../../hooks';

export const ReactHotToast = styled(Box)<BoxProps>(({ theme }) => {
  const { settings } = useSettings()
  const { layout, navHidden } = settings

  return {
    '& > div': {
      left: `${theme.spacing(6)} !important`,
      right: `${theme.spacing(6)} !important`,
      bottom: `${theme.spacing(6)} !important`,
      zIndex: `${theme.zIndex.drawer - 1} !important`,
      top: layout === 'horizontal' && !navHidden ? '139px !important' : '75px !important'
    },
    '& .react-hot-toast': {
      fontWeight: 400,
      fontSize: '1rem',
      borderRadius: '20px',
      letterSpacing: '0.14px',
      color: theme.palette.text.primary,
      background: theme.palette.background.paper,
      boxShadow:
        theme.palette.mode === 'light'
          ? '0px 4px 10px -4px #3a354199'
          : '0px 8px 16px -4px #131120a6',
      '&>:first-of-type:not([role])>:first-of-type': {
        width: 14,
        height: 14
      }
    }
  }
});