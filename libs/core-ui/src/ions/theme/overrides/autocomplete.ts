import { Theme } from '../../../foundations';
import { SkinType } from '../../../layouts'

const Autocomplete = (theme: Theme, skin: SkinType) => {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          ...(skin === 'bordered' && { boxShadow: 'none', border: `1px solid ${theme.palette.divider}` })
        }
      }
    }
  }
}

export default Autocomplete
