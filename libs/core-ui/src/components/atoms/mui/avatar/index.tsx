import { forwardRef, Ref, FC } from 'react'
import { Avatar as MuiAvatar, lighten, useTheme, AvatarProps } from '../../../../foundations';
import { ThemeColorType } from '../../../../layouts';
import { useBgColor, UseBgColorType } from '../../../../hooks';

export type CustomAvatarProps = AvatarProps & {
  color?: ThemeColorType;
  skin?: 'filled' | 'light' | 'light-static';
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomAvatar: FC<CustomAvatarProps> = forwardRef((props, ref: Ref<any>) => {
  const { sx, src, skin, color } = props;
  const theme = useTheme();
  const bgColors: UseBgColorType = useBgColor();

  const getAvatarStyles = (skin: 'filled' | 'light' | 'light-static' | undefined, skinColor: ThemeColorType) => {
    let avatarStyles

    if (skin === 'light') {
      avatarStyles = { ...bgColors[`${skinColor}Light`] }
    } else if (skin === 'light-static') {
      avatarStyles = {
        color: bgColors[`${skinColor}Light`].color,
        backgroundColor: lighten(theme.palette[skinColor].main, 0.88)
      }
    } else {
      avatarStyles = { ...bgColors[`${skinColor}Filled`] }
    }

    return avatarStyles
  }

  const colors: UseBgColorType = {
    primary: getAvatarStyles(skin, 'primary'),
    secondary: getAvatarStyles(skin, 'secondary'),
    success: getAvatarStyles(skin, 'success'),
    error: getAvatarStyles(skin, 'error'),
    warning: getAvatarStyles(skin, 'warning'),
    info: getAvatarStyles(skin, 'info')
  }

  return <MuiAvatar ref={ref} {...props} sx={!src && skin && color ? Object.assign(colors[color], sx) : sx} />
})

CustomAvatar.defaultProps = {
  skin: 'filled',
  color: 'primary'
}