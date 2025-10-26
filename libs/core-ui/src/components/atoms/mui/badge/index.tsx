import { FC } from "react";
import { Badge as MuiBadge, BadgeProps } from '../../../../foundations';
import { useBgColor, UseBgColorType } from '../../../../hooks';

export type CustomBadgeProps = BadgeProps & { skin?: 'light' }

export const CustomBadge: FC<CustomBadgeProps> = (props) => {
  const { sx, skin, color } = props
  const bgColors = useBgColor()

  const colors: UseBgColorType = {
    primary: { ...bgColors.primaryLight },
    secondary: { ...bgColors.secondaryLight },
    success: { ...bgColors.successLight },
    error: { ...bgColors.errorLight },
    warning: { ...bgColors.warningLight },
    info: { ...bgColors.infoLight }
  }

  return (
    <MuiBadge
      {...props}
      sx={skin === 'light' && color ? Object.assign({ '& .MuiBadge-badge': colors[color] }, sx) : sx}
    />
  )
}