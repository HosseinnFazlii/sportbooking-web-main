import { Theme } from '../../../foundations';

const Rating = (theme: Theme) => {
  return {
    MuiRating: {
      styleOverrides: {
        root: {
          color: theme.palette.warning.main,
          '& svg': {
            flexShrink: 0
          }
        }
      }
    }
  }
}

export default Rating
