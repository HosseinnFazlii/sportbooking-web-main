import React, { FC, ReactNode } from 'react';
import { styled, useTheme } from '@mui/material/styles'
import { SwipeableDrawer as MuiSwipeableDrawer, SwipeableDrawerProps } from '../../../foundations';
import { HandleSetBooleanType, Settings, VerticalComponentPropsType } from '../../types'
import { hexToRGBA } from '@mf-core/core-ui';

interface IDrawer {
  navWidth: number;
  navHover: boolean;
  navVisible: boolean;
  collapsedNavWidth: number;
  navigationBorderWidth: number;
  hidden: boolean;
  settings: Settings;
  children: ReactNode;
  setNavHover: HandleSetBooleanType;
  setNavVisible: HandleSetBooleanType;
  navMenuProps?: VerticalComponentPropsType;
}

const SwipeableDrawer = styled(MuiSwipeableDrawer)<SwipeableDrawerProps>({
  overflowX: 'hidden',
  transition: 'width .25s ease-in-out',
  '& ul': {
    listStyle: 'none'
  },
  '& .MuiListItem-gutters': {
    paddingLeft: 4,
    paddingRight: 4
  },
  '& .MuiDrawer-paper': {
    // left: 'unset',
    // right: 'unset',
    overflowX: 'hidden',
    transition: 'width .25s ease-in-out, box-shadow .25s ease-in-out'
  }
})

export const Drawer: FC<IDrawer> = (props) => {
  // ** Props
  const {
    hidden,
    children,
    navHover,
    navWidth,
    settings,
    navVisible,
    setNavHover,
    navMenuProps,
    setNavVisible,
    collapsedNavWidth,
    navigationBorderWidth
  } = props

  // ** Hook
  const theme = useTheme()

  // ** Vars
  const { mode, navCollapsed, direction } = settings;
  const isRtl = direction === 'rtl';

  const drawerColors = () => {
    if (mode === 'semi-dark') {
      return {
        backgroundColor: 'customColors.darkBg',
        '& .MuiTypography-root, & svg': {
          color: hexToRGBA(theme.palette.customColors.dark, 0.87)
        }
      }
    } else
      return {
        backgroundColor: 'background.default'
      }
  }

  // Drawer Props for Mobile & Tablet screens
  const MobileDrawerProps = {
    open: navVisible,
    onOpen: () => setNavVisible(true),
    onClose: () => setNavVisible(false),
    ModalProps: {
      keepMounted: true // Better open performance on mobile.
    }
  }

  // Drawer Props for Laptop & Desktop screens
  const DesktopDrawerProps = {
    open: true,
    onOpen: () => null,
    onClose: () => null,
    onMouseEnter: () => {
      setNavHover(true);
    },
    onMouseLeave: () => {
      setNavHover(false);
    }
  }

  let userNavMenuStyle = {};
  let userNavMenuPaperStyle = {};
  if (navMenuProps && navMenuProps.sx) {
    userNavMenuStyle = navMenuProps.sx;
  }
  if (navMenuProps && navMenuProps.PaperProps && navMenuProps.PaperProps.sx) {
    userNavMenuPaperStyle = navMenuProps.PaperProps.sx;
  }
  const userNavMenuProps = Object.assign({}, navMenuProps);
  delete userNavMenuProps.sx;
  delete userNavMenuProps.PaperProps;

  return (
    <SwipeableDrawer
      className='layout-vertical-nav print-hide'
      variant={hidden ? 'temporary' : 'permanent'}
      {...(hidden ? { ...MobileDrawerProps } : { ...DesktopDrawerProps })}
      anchor={isRtl ? 'right' : 'left'}
      PaperProps={{
        sx: {
          ...drawerColors(),
          width: navCollapsed && !navHover ? collapsedNavWidth : navWidth,
          ...(!hidden && navCollapsed && navHover ? { boxShadow: 9 } : {}),
          ...(navigationBorderWidth === 0
            ? {}
            : isRtl
              ? { borderLeft: `${navigationBorderWidth}px solid ${theme.palette.divider}` }
              : { borderRight: `${navigationBorderWidth}px solid ${theme.palette.divider}` }),
          ...userNavMenuPaperStyle,
          // left: "unset",
          left: "0px",

        },
        ...navMenuProps?.PaperProps
      }}
      sx={{
        width: navCollapsed ? collapsedNavWidth : navWidth,
        ...userNavMenuStyle
      }}
      {...userNavMenuProps}
    >
      {children}
    </SwipeableDrawer>
  )
}
