import { FC } from "react";
import { Box } from '../../../foundations'
import { HorizontalNavItemsType, Settings } from '../../../layouts'
import { themeConfig } from '../../../configs'
import { HorizontalNavItems } from './nav-items'

interface IHorizontalNavigation {
  settings: Settings;
  horizontalNavItems?: HorizontalNavItemsType;
}

export const HorizontalNavigation: FC<IHorizontalNavigation> = (props) => {
  return (
    <Box
      className='menu-content'
      sx={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        '& > *': {
          '&:not(:last-child)': { mr: 2 },
          ...(themeConfig.menuTextTruncate && { maxWidth: 220 })
        }
      }}
    >
      <HorizontalNavItems {...props} />
    </Box>
  )
}
