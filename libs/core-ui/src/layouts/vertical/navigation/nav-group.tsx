import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Box, Typography, Chip, Collapse, ListItem, ListItemButton, ListItemIcon, BoxProps, styled, useTheme } from '../../../foundations'
import { Icon, CanViewNavGroup, Translation } from '../../../components'
import { themeConfig } from '../../../configs'
import { INavGroup, IVerticalNavGroup } from '../../types'
import { hasActiveChild, hexToRGBA, removeChildren } from '../../../utils'
import { VerticalNavItems } from './nav-items'

const MenuItemTextWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  // flexDirection: theme.direction === 'rtl' ? 'row-reverse' : 'row',
  transition: 'opacity .25s ease-in-out',
  ...(themeConfig.menuTextTruncate && { overflow: 'hidden' })
}))

export const VerticalNavGroup: FC<IVerticalNavGroup> = (props) => {
  const {
    item,
    parent,
    settings,
    navHover,
    navVisible,
    isSubToSub,
    groupActive,
    setGroupActive,
    collapsedNavWidth,
    currentActiveGroup,
    setCurrentActiveGroup,
    navigationBorderWidth
  } = props;

  // ** Hooks & Vars
  const theme = useTheme()
  const router = useRouter();
  const currentURL = router.asPath;
  const { mode, navCollapsed, verticalNavToggleType, direction } = settings;
  const isRTL = direction === 'rtl';

  // ** Accordion menu group open toggle
  const toggleActiveGroup = (item: INavGroup, parent: INavGroup | undefined) => {
    let openGroup = groupActive

    // ** If Group is already open and clicked, close the group
    if (openGroup.includes(item.title)) {
      openGroup.splice(openGroup.indexOf(item.title), 1)

      // If clicked Group has open group children, Also remove those children to close those groups
      if (item.children) {
        removeChildren(item.children, openGroup, currentActiveGroup)
      }
    } else if (parent) {
      // ** If Group clicked is the child of an open group, first remove all the open groups under that parent
      if (parent.children) {
        removeChildren(parent.children, openGroup, currentActiveGroup)
      }

      // ** After removing all the open groups under that parent, add the clicked group to open group array
      if (!openGroup.includes(item.title)) {
        openGroup.push(item.title)
      }
    } else {
      // ** If clicked on another group that is not active or open, create openGroup array from scratch

      // ** Empty Open Group array
      openGroup = []

      // ** push Current Active Group To Open Group array
      if (currentActiveGroup.every(elem => groupActive.includes(elem))) {
        openGroup.push(...currentActiveGroup)
      }

      // ** Push current clicked group item to Open Group array
      if (!openGroup.includes(item.title)) {
        openGroup.push(item.title)
      }
    }
    setGroupActive([...openGroup])
  }

  // ** Menu Group Click
  const handleGroupClick = () => {
    const openGroup = groupActive
    if (verticalNavToggleType === 'collapse') {
      if (openGroup.includes(item.title)) {
        openGroup.splice(openGroup.indexOf(item.title), 1)
      } else {
        openGroup.push(item.title)
      }
      setGroupActive([...openGroup])
    } else {
      toggleActiveGroup(item, parent)
    }
  }

  useEffect(() => {
    if (hasActiveChild(item, currentURL)) {
      if (!groupActive.includes(item.title)) groupActive.push(item.title)
    } else {
      const index = groupActive.indexOf(item.title)
      if (index > -1) groupActive.splice(index, 1)
    }
    setGroupActive([...groupActive])
    setCurrentActiveGroup([...groupActive])

    // Empty Active Group When Menu is collapsed and not hovered, to fix issue route change
    if (navCollapsed && !navHover) {
      setGroupActive([])
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  useEffect(() => {
    if (navCollapsed && !navHover) {
      setGroupActive([])
    }

    if ((navCollapsed && navHover) || (groupActive.length === 0 && !navCollapsed)) {
      setGroupActive([...currentActiveGroup])
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navCollapsed, navHover]);

  useEffect(() => {
    if (groupActive.length === 0 && !navCollapsed) {
      setGroupActive([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navHover]);

  const icon = parent && !item.icon ? themeConfig.navSubItemIcon : item.icon

  const menuGroupCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 }

  const conditionalColors = () => {
    if (mode === 'semi-dark') {
      return {
        color: hexToRGBA(theme.palette.customColors.dark, 0.87),
        '&:hover': {
          backgroundColor: hexToRGBA(theme.palette.customColors.dark, 0.04),
        },
        '&.Mui-selected': {
          backgroundColor: hexToRGBA(theme.palette.customColors.dark, 0.08),
          '&:hover': {
            backgroundColor: hexToRGBA(theme.palette.customColors.dark, 0.12),
          }
        }
      }
    } else {
      return {
        '&.Mui-selected': {
          backgroundColor: 'action.hover',
          '&:hover': {
            backgroundColor: 'action.hover'
          }
        }
      }
    }
  }

  return (
    <CanViewNavGroup navGroup={item}>
      <ListItem
        disablePadding
        className='nav-group'
        onClick={handleGroupClick}
        sx={{ mt: 1.5, px: '0 !important', flexDirection: 'column' }}
      >
        <ListItemButton
          className={clsx({
            'Mui-selected': groupActive.includes(item.title) || currentActiveGroup.includes(item.title)
          })}
          sx={{
            py: 2.25,
            width: '100%',
            ...conditionalColors(),
            borderTopRightRadius: 100,
            borderBottomRightRadius: 100,
            transition: 'padding-left .25s ease-in-out',
            pl: navCollapsed && !navHover ? (collapsedNavWidth - navigationBorderWidth - 24) / 8 : 5.5,
            pr: navCollapsed && !navHover ? ((collapsedNavWidth - navigationBorderWidth - 24) / 2 - 5) / 4 : 3.5,
            '&.Mui-selected.Mui-focusVisible': {
              backgroundColor: 'action.focus',
              '&:hover': {
                backgroundColor: 'action.focus'
              }
            },
            // flexDirection: isRTL ? "row-reverse" : "row"
          }}
        >
          {isSubToSub ? null : (
            <ListItemIcon
              sx={{
                color: 'text.primary',
                transition: 'margin .25s ease-in-out',
                ...(parent && navCollapsed && !navHover ? {} : { mr: 2.5 }),
                ...(navCollapsed && !navHover ? { mr: 0 } : {}), // this condition should come after (parent && navCollapsed && !navHover) condition for proper styling
                ...(parent && item.children ? { ml: 1.25, mr: 3.75 } : {})
              }}
            >
              <Icon icon={icon as string} {...(parent && { fontSize: '1rem' })} />
            </ListItemIcon>
          )}
          <MenuItemTextWrapper
            sx={{
              ...menuGroupCollapsedStyles,
              ...(isSubToSub ? (isRTL ? { mr: 9 } : { ml: 9 }) : {}),
              // flexDirection: isRTL ? "row-reverse" : "row"
            }}
          >
            <Typography
              {...((themeConfig.menuTextTruncate || (!themeConfig.menuTextTruncate && navCollapsed && !navHover)) && {
                noWrap: true
              })}
            // sx={{ textAlign: isRTL ? 'right' : 'left' }}
            >
              <Translation text={item.title} />
            </Typography>
            <Box
              className='menu-item-meta'
              sx={{
                ...(isRTL ? { mr: 0.8 } : { ml: 0.8 }),
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
                '& svg': {
                  transition: 'transform .25s ease-in-out',
                  color: mode === 'semi-dark' ? hexToRGBA(theme.palette.customColors.dark, 0.87) : 'text.primary',
                  ...(groupActive.includes(item.title) && {
                    transform: direction === 'ltr' ? 'rotate(90deg)' : 'rotate(-90deg)'
                  })
                }
              }}
            >
              {item.badgeContent ? (
                <Chip
                  label={item.badgeContent}
                  color={item.badgeColor || 'primary'}
                  sx={{
                    ...(isRTL ? { ml: 0.8 } : { mr: 0.8 }),
                    height: 20,
                    fontWeight: 500,
                    '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                  }}
                />
              ) : null}
              <Icon icon={direction === 'ltr' ? 'mdi:chevron-right' : 'mdi:chevron-left'} />
            </Box>
          </MenuItemTextWrapper>
        </ListItemButton>
        <Collapse
          component='ul'
          onClick={e => e.stopPropagation()}
          in={groupActive.includes(item.title)}
          sx={{
            pl: 0,
            paddingInline: 0,
            width: '100%',
            ...menuGroupCollapsedStyles,
            transition: 'all 0.25s ease-in-out'
          }}
        >
          <VerticalNavItems
            {...props}
            parent={item}
            navVisible={navVisible}
            verticalNavItems={item.children}
            isSubToSub={parent && item.children ? item : undefined}
          />
        </Collapse>
      </ListItem>
    </CanViewNavGroup>
  )
}
