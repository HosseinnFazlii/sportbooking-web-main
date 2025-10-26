import { IconButton, BoxProps, styled, Box } from '../../../foundations';
import { IVerticalNavHeader } from '../../types';
import { Icon, Link } from '../../../components';
import { FC } from 'react';

const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const StyledLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  width: "100%",
  padding: "10px 30px 10px 0px",
});

export const VerticalNavHeader: FC<IVerticalNavHeader> = (props) => {
  const {
    hidden,
    Logo,
    navHover,
    settings,
    saveSettings,
    collapsedNavWidth,
    toggleNavVisibility,
    navigationBorderWidth,
    navMenuBranding: userNavMenuBranding
  } = props;
  const { navCollapsed } = settings;

  const menuCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 };

  const getMenuHeaderPadding = () => {
    if (navCollapsed && !navHover) {
      if (userNavMenuBranding) {
        return 0;
      } else {
        return (collapsedNavWidth - navigationBorderWidth - 30) / 8;
      }
    } else {
      return 6;
    }
  }

  const brandingContent = userNavMenuBranding ? (
    userNavMenuBranding(props)
  ) : (
    <StyledLink href='/home'>
      <Logo isMini={navCollapsed && !navHover} themeBasedColor="auto" />
    </StyledLink>
  );

  const toggleButton = hidden ? (
    <IconButton
      disableRipple
      disableFocusRipple
      onClick={toggleNavVisibility}
      sx={{ p: 0, backgroundColor: 'transparent !important' }}
    >
      <Icon icon="mdi:close" fontSize={20} />
    </IconButton>
  ) : (
    <IconButton
      disableRipple
      disableFocusRipple
      onClick={() => saveSettings({ ...settings, navCollapsed: !navCollapsed })}
      sx={{
        p: 0,
        color: 'text.primary',
        backgroundColor: 'transparent !important',
        '& svg': {
          fontSize: '1.25rem',
          ...menuCollapsedStyles,
          transition: 'opacity .25s ease-in-out'
        }
      }}
    >
      <Icon style={{ transition: "0.2s ease-in-out", transform: navCollapsed ? "rotate(45deg)" : "" }} icon={navCollapsed ? "mdi:pin-outline" : "mdi:pin"} />
    </IconButton>
  );

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: getMenuHeaderPadding() }}>
      {brandingContent}
      {toggleButton}
    </MenuHeaderWrapper>
  )
}
