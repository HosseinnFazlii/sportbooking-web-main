import { Theme } from '../../../foundations';

const Typography = (theme: Theme) => {
  return {
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: theme.spacing(2)
        }
      }
    }
  }
}

export default Typography
