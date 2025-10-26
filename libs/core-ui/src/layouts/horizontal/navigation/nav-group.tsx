import { SyntheticEvent, useState, useEffect, FC } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { Box, Chip, Fade, List, Paper, Typography, ListItemIcon, styled, ClickAwayListener, ListItem as MuiListItem, ListItemProps, Popper } from '../../../foundations';
import { Icon, CanViewNavGroup, Translation } from '../../../components';
import { themeConfig } from '../../../configs';
import { INavGroup, Settings } from '../../types';
import HorizontalNavItems from './nav-items';
import { hexToRGBA, hasActiveChild } from '../../../utils';

interface IHorizontalNavGroup {
  item: INavGroup;
  settings: Settings;
  hasParent?: boolean;
}

const ListItem = styled(MuiListItem)<ListItemProps>(({ theme }) => ({
  cursor: 'pointer',
  paddingTop: theme.spacing(2.25),
  paddingBottom: theme.spacing(2.25),
  '&:hover': {
    background: theme.palette.action.hover
  }
}))

const NavigationMenu = styled(Paper)(({ theme }) => ({
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: theme.spacing(2, 0),
  maxHeight: 'calc(100vh - 13rem)',
  backgroundColor: theme.palette.background.paper,
  ...(themeConfig.menuTextTruncate ? { width: 260 } : { minWidth: 260 }),

  '&::-webkit-scrollbar': {
    width: 6
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: 20,
    background: hexToRGBA(theme.palette.mode === 'light' ? '#B0ACB5' : '#575468', 0.6)
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: 20,
    background: 'transparent'
  },
  '& .MuiList-root': {
    paddingTop: 0,
    paddingBottom: 0
  },
  '& .menu-group.Mui-selected': {
    borderRadius: 0,
    backgroundColor: theme.palette.action.hover
  }
}))

export const HorizontalNavGroup: FC<IHorizontalNavGroup> = (props) => {
  const { item, hasParent, settings } = props
  const router = useRouter()
  const currentURL = router.asPath
  const { skin, direction } = settings
  const { navSubItemIcon, menuTextTruncate, horizontalMenuToggle, horizontalMenuAnimation } = themeConfig
  const popperPlacement = direction === 'rtl' ? 'bottom-end' : 'bottom-start'
  const popperPlacementSubMenu = direction === 'rtl' ? 'left-start' : 'right-start'
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const handleGroupOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleGroupClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleMenuToggleOnClick = (event: SyntheticEvent) => {
    if (anchorEl) {
      handleGroupClose()
    } else {
      handleGroupOpen(event)
    }
  }

  useEffect(() => {
    handleGroupClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

  const icon = item.icon ? item.icon : navSubItemIcon
  const toggleIcon = direction === 'rtl' ? 'mdi:chevron-left' : 'mdi:chevron-right'

  const WrapperCondition = horizontalMenuToggle === 'click'
  const renderMenuItems = (
    <HorizontalNavItems {...props} hasParent horizontalNavItems={item.children} />
  )

  const renderPopperContent = horizontalMenuAnimation ? (
    <Popper
      open={menuOpen}
      anchorEl={anchorEl}
      placement={hasParent ? popperPlacementSubMenu : popperPlacement}
      transition
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <NavigationMenu>
            {renderMenuItems}
          </NavigationMenu>
        </Fade>
      )}
    </Popper>
  ) : (
    <Popper
      open={menuOpen}
      anchorEl={anchorEl}
      placement={hasParent ? popperPlacementSubMenu : popperPlacement}
    >
      <NavigationMenu>
        {renderMenuItems}
      </NavigationMenu>
    </Popper>
  )

  const content = (
    <List component='div' sx={{ py: skin === 'bordered' ? 2.625 : 2.75 }}>
      <ListItem
        aria-haspopup='true'
        {...(WrapperCondition ? {} : { onMouseEnter: handleGroupOpen })}
        className={clsx('menu-group', { 'Mui-selected': hasActiveChild(item, currentURL) })}
        {...(horizontalMenuToggle === 'click' ? { onClick: handleMenuToggleOnClick } : {})}
        sx={{
          ...(menuOpen ? { backgroundColor: 'action.hover' } : {}),
          ...(!hasParent
            ? {
              px: 5.5,
              borderRadius: 3.5,
              '&.Mui-selected': {
                boxShadow: 3,
                backgroundImage: theme =>
                  `linear-gradient(98deg, ${theme.palette.customColors.primaryGradient}, ${theme.palette.primary.main} 94%)`,
                '& .MuiTypography-root, & .MuiListItemIcon-root, & svg': {
                  color: 'common.white'
                }
              }
            }
            : { px: 5 })
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              ...(menuTextTruncate && { overflow: 'hidden' })
            }}
          >
            <ListItemIcon sx={{ color: 'text.primary', mr: !hasParent ? 2 : 3 }}>
              <Icon icon={icon} fontSize={icon === navSubItemIcon ? '1rem' : '1.375rem'} />
            </ListItemIcon>
            <Typography {...(menuTextTruncate && { noWrap: true })}>
              <Translation text={item.title} />
            </Typography>
          </Box>
          <Box sx={{ ml: 1.6, display: 'flex', alignItems: 'center', color: 'text.primary' }}>
            {item.badgeContent ? (
              <Chip
                label={item.badgeContent}
                color={item.badgeColor || 'primary'}
                sx={{
                  mr: 1.6,
                  height: 20,
                  fontWeight: 500,
                  '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                }}
              />
            ) : null}
            <Icon icon={hasParent ? toggleIcon : 'mdi:chevron-down'} fontSize='1.375rem' />
          </Box>
        </Box>
      </ListItem>
      {renderPopperContent}
    </List>
  );

  return (
    <CanViewNavGroup navGroup={item}>
      {horizontalMenuToggle === 'click' ? (
        <ClickAwayListener onClickAway={handleGroupClose}>
          {content}
        </ClickAwayListener>
      ) : (
        <div onMouseLeave={handleGroupClose}>
          {content}
        </div>
      )}
    </CanViewNavGroup>
  )
}
