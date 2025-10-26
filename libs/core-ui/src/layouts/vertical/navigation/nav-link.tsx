import { ElementType, FC } from 'react';
import { useRouter } from 'next/router';
import { Box, ListItem, Chip, Typography, BoxProps, styled, useTheme, ListItemButton, ListItemIcon, ListItemButtonProps } from '../../../foundations';
import { themeConfig } from '../../../configs';
import { INavLink, INavGroup, HandleVoidType } from '../../types';
import { Settings } from '../../../contexts';
import { Icon, Translation, CanViewNavLink, Link } from '../../../components';
import { handleURLQueries, hexToRGBA } from '../../../utils';
interface IVerticalNavLink {
  parent?: boolean;
  item: INavLink;
  navHover?: boolean;
  settings: Settings;
  navVisible?: boolean;
  collapsedNavWidth: number;
  navigationBorderWidth: number;
  isSubToSub?: INavGroup | undefined;
  toggleNavVisibility: HandleVoidType;
}

// ** Styled Components
const MenuNavLink = styled(ListItemButton)<
  ListItemButtonProps & { component?: ElementType; href: string; target?: '_blank' | undefined }
>(({ theme }) => ({
  width: '100%',
  borderTopRightRadius: 100,
  borderBottomRightRadius: 100,
  color: theme.palette.text.primary,
  transition: 'padding-left .25s ease-in-out',
  '&.active': {
    '&, &:hover': {
      boxShadow: theme.shadows[3],
      backgroundImage: `linear-gradient(98deg, ${theme.palette.primary.main}33, ${theme.palette.primary.main} 94%)`
    },
    '& .MuiTypography-root, & .MuiListItemIcon-root': {
      color: `${theme.palette.common.white} !important`
    }
  }
}))

const MenuItemTextMetaWrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'opacity .25s ease-in-out',
  ...(themeConfig.menuTextTruncate && { overflow: 'hidden' })
}))

export const VerticalNavLink: FC<IVerticalNavLink> = ({
  item,
  parent,
  navHover,
  settings,
  navVisible,
  isSubToSub,
  collapsedNavWidth,
  toggleNavVisibility,
  navigationBorderWidth
}) => {
  const theme = useTheme();
  const router = useRouter();
  const { mode, navCollapsed, direction } = settings;
  const icon = parent && !item.icon ? themeConfig.navSubItemIcon : item.icon;
  const isRTL = direction === 'rtl';

  const conditionalColors = () => {
    if (mode === 'semi-dark') {
      return {
        color: hexToRGBA(theme.palette.customColors.dark, 0.87),
        '&:hover': {
          backgroundColor: hexToRGBA(theme.palette.customColors.dark, 0.04)
        }
      }
    } else return {}
  }

  const isNavLinkActive = () => {
    if (router.asPath === item.path || handleURLQueries(router, item.path)) {
      return true
    } else {
      return false
    }
  }

  const navIcon = isSubToSub || !icon
    ? null
    : (
      <ListItemIcon
        sx={{
          color: 'text.primary',
          transition: 'margin .25s ease-in-out',
          marginInlineEnd: parent ? 3.75 : navCollapsed && !navHover ? 0 : 2.5,
          ...(parent ? { marginInlineStart: 1.25 } : {}),
          '& svg': {
            fontSize: '1rem',
            ...(!parent ? { fontSize: '1.5rem' } : {}),
            ...(parent && item.icon ? { fontSize: '1rem' } : {})
          }
        }}
      >
        <Icon icon={icon as string} />
      </ListItemIcon>
    );

  const textContent = (
    <MenuItemTextMetaWrapper
      sx={{
        ...(isSubToSub ? { marginInlineStart: 9 } : {}),
        ...(navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 })
      }}
    >
      <Typography
        {...((themeConfig.menuTextTruncate || (!themeConfig.menuTextTruncate && navCollapsed && !navHover)) && {
          noWrap: true
        })}
      >
        <Translation text={item.title} />
      </Typography>
      {item.badgeContent ? (
        <Chip
          label={item.badgeContent}
          color={item.badgeColor || 'primary'}
          sx={{
            marginInlineStart: 1.25,
            height: 20,
            fontWeight: 500,
            '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
          }}
        />
      ) : null}
    </MenuItemTextMetaWrapper>
  );

  const pl = navCollapsed && !navHover ? (collapsedNavWidth - navigationBorderWidth - 24) / 8 : 5.5;
  const pr = navCollapsed && !navHover ? ((collapsedNavWidth - navigationBorderWidth - 24) / 2 - 5) / 4 : 3.5;

  return (
    <CanViewNavLink navLink={item}>
      <ListItem
        disablePadding
        className='nav-link'
        disabled={item.disabled || false}
        sx={{ mt: 1.5, px: '0 !important' }}
      >
        <MenuNavLink
          component={Link}
          {...(item.disabled && { tabIndex: -1 })}
          className={isNavLinkActive() ? 'active' : ''}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          href={item.path === undefined ? '/' : `${item.path}`}
          {...(item.openInNewTab ? { target: '_blank' } : null)}
          onClick={e => {
            if (item.path === undefined) {
              e.preventDefault();
              e.stopPropagation();
            }
            if (navVisible) {
              toggleNavVisibility();
            }
          }}
          sx={{
            py: 2.25,
            ...conditionalColors(),
            ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' }),
            pl: isRTL ? pr : pl,
            pr: isRTL ? pl : pr,
          }}
        >
          {navIcon}
          {textContent}
        </MenuNavLink>
      </ListItem>
    </CanViewNavLink>
  )
}

export default VerticalNavLink
