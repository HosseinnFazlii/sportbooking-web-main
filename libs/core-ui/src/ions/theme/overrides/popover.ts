import { Theme } from '../../../foundations';
import { SkinType } from '../../../layouts';

const Popover = (theme: Theme, skin: SkinType) => {
  return {
    MuiPopover: {
      styleOverrides: {
        root: {
          '& .MuiPopover-paper': {
            boxShadow: theme.shadows[skin === 'bordered' ? 0 : 6],
            ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
          }
        }
      }
    }
  }
}

export default Popover
