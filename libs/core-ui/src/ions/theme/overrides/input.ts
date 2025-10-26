import { hexToRGBA } from '@mf-core/core-ui';
import { Theme } from '../../../foundations';

const input = (theme: Theme) => {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.text.secondary
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&:before': {
            borderBottom: `1px solid ${hexToRGBA(theme.palette.customColors.main, 0.22)}`
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: `1px solid ${hexToRGBA(theme.palette.customColors.main, 0.32)}`
          },
          '&.Mui-disabled:before': {
            borderBottomStyle: 'solid'
          }
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: `${hexToRGBA(theme.palette.customColors.main, 0.04)}`,
          '&:hover:not(.Mui-disabled)': {
            backgroundColor: `${hexToRGBA(theme.palette.customColors.main, 0.08)}`
          },
          '&:before': {
            borderBottom: `1px solid ${hexToRGBA(theme.palette.customColors.main, 0.22)}`
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: `1px solid ${hexToRGBA(theme.palette.customColors.main, 0.32)}`
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover:not(.Mui-focused):not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: `${hexToRGBA(theme.palette.customColors.main, 0.32)}`
          },
          '&:hover.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.error.main
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: `${hexToRGBA(theme.palette.customColors.main, 0.22)}`
          },
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.text.disabled
          }
        }
      }
    }
  }
}

export default input
