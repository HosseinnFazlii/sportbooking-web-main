import { useTheme, TimelineDot as MuiTimelineDot, TimelineDotProps } from '../../../../foundations';
import { useBgColor, UseBgColorType } from '../../../../hooks';
import { hexToRGBA } from '../../../../utils';

export type CustomTimelineDotProps = TimelineDotProps & { skin?: 'light' }

export type ColorsType = {
  [key: string]: {
    color: string
    boxShadow: string
    backgroundColor: string
  }
}

export const CustomTimelineDot = (props: CustomTimelineDotProps) => {
  const { sx, skin, color, variant } = props
  const theme = useTheme()
  const bgColors: UseBgColorType = useBgColor()

  const colors: ColorsType = {
    primary: {
      boxShadow: 'none',
      color: theme.palette.primary.main,
      backgroundColor: bgColors.primaryLight.backgroundColor
    },
    secondary: {
      boxShadow: 'none',
      color: theme.palette.secondary.main,
      backgroundColor: bgColors.secondaryLight.backgroundColor
    },
    success: {
      boxShadow: 'none',
      color: theme.palette.success.main,
      backgroundColor: bgColors.successLight.backgroundColor
    },
    error: {
      boxShadow: 'none',
      color: theme.palette.error.main,
      backgroundColor: bgColors.errorLight.backgroundColor
    },
    warning: {
      boxShadow: 'none',
      color: theme.palette.warning.main,
      backgroundColor: bgColors.warningLight.backgroundColor
    },
    info: {
      boxShadow: 'none',
      color: theme.palette.info.main,
      backgroundColor: bgColors.infoLight.backgroundColor
    },
    grey: {
      boxShadow: 'none',
      color: theme.palette.grey[500],
      backgroundColor: hexToRGBA(theme.palette.grey[500], 0.12)
    }
  }

  return (
    <MuiTimelineDot
      {...props}
      sx={color && skin === 'light' && variant === 'filled' ? Object.assign(colors[color], sx) : sx}
    />
  )
}

CustomTimelineDot.defaultProps = {
  color: 'grey',
  variant: 'filled'
}
