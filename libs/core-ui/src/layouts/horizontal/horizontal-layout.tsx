import { FC, Fragment, useMemo, useState } from "react";
import { Fab, AppBar, styled, Box, BoxProps, Toolbar as MuiToolbar, ToolbarProps, IconButton, SxProps, Theme } from '../../foundations';
import { Icon, Customizer, Footer, ScrollToTop, LanguageDropdown, ModeToggler, UserDropdown } from '../../components';
import { themeConfig } from '../../configs';
import { ILayout } from '../types';
import { hexToRGBA } from '../../utils';
import { HorizontalNavigation } from './navigation';

const HorizontalLayoutWrapper = styled('div')({
  height: '100%',
  display: 'flex',
  ...(themeConfig.horizontalMenuAnimation && { overflow: 'clip' })
})

const MainContentWrapper = styled(Box)<BoxProps>({
  flexGrow: 1,
  minWidth: 0,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column'
})

const Toolbar = styled(MuiToolbar)<ToolbarProps>(({ theme }) => ({
  width: '100%',
  padding: `${theme.spacing(0, 6)} !important`,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(4)
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}))

const ContentWrapper = styled('main')(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  padding: theme.spacing(6),
  transition: 'padding .25s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}))

export const HorizontalLayout: FC<ILayout> = (props) => {
  const {
    hidden,
    children,
    settings,
    scrollToTop,
    footerProps,
    saveSettings,
    contentHeightFixed,
    horizontalLayoutProps
  } = props;
  const { skin, appBar, navHidden, appBarBlur, contentWidth } = settings
  const appBarProps = horizontalLayoutProps?.appBar?.componentProps
  const userNavMenuContent = horizontalLayoutProps?.navMenu?.content
  const [navVisible, setNavVisible] = useState<boolean>(false);
  const toggleNavVisibility = () => setNavVisible(!navVisible);

  let userAppBarStyle = {}
  if (appBarProps && appBarProps.sx) {
    userAppBarStyle = appBarProps.sx
  }
  const userAppBarProps = Object.assign({}, appBarProps)
  delete userAppBarProps.sx

  const LogoComponent = horizontalLayoutProps?.Logo || props.horizontalLayoutProps?.Logo

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const appBarContentProps = {
    ...props,
    toggleNavVisibility,
    navVisible,
    setNavVisible,
    appBarProps
  } as any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navMenuContentProps = {
    ...props,
    toggleNavVisibility,
    navVisible,
    setNavVisible
  } as any

  const appBarContent = horizontalLayoutProps?.appBar?.content
    ? horizontalLayoutProps.appBar.content(appBarContentProps)
    : (
      <Fragment>
        {hidden && !settings.navHidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon='mdi:menu' />
          </IconButton>
        ) : null}
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <UserDropdown settings={settings} />
        <LanguageDropdown settings={settings} saveSettings={saveSettings} />
      </Fragment>
    )

  const horizontalNavItems = horizontalLayoutProps?.navMenu?.navItems || props.verticalLayoutProps?.navMenu?.navItems

  const navMenuContent = userNavMenuContent
    ? userNavMenuContent(navMenuContentProps)
    : (
      <HorizontalNavigation
        {...props}
        horizontalNavItems={horizontalNavItems}
      />
    )

  const brandingContent = horizontalLayoutProps?.navMenu?.branding
    ? horizontalLayoutProps.navMenu.branding(navMenuContentProps)
    : null

  const beforeNavMenuContent = horizontalLayoutProps?.navMenu?.beforeContent
    ? horizontalLayoutProps.navMenu.beforeContent(navMenuContentProps)
    : null

  const afterNavMenuContent = horizontalLayoutProps?.navMenu?.afterContent
    ? horizontalLayoutProps.navMenu.afterContent(navMenuContentProps)
    : null

  const navContainerSx = useMemo<SxProps<Theme>>(() => {
    const base: SxProps<Theme> = [
      {
        gridArea: 'nav',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 0,
        columnGap: theme => theme.spacing(3)
      }
    ]

    const sxArray = base as Array<SxProps<Theme>>

    if (!userNavMenuContent) {
      sxArray.push({
        '& .menu-content': {
          justifyContent: 'center',
          width: 'max-content'
        }
      })
    }

    const userNavSx = horizontalLayoutProps?.navMenu?.sx
    if (userNavSx) {
      if (Array.isArray(userNavSx)) {
        sxArray.push(...(userNavSx as Array<SxProps<Theme>>))
      } else {
        sxArray.push(userNavSx)
      }
    }

    return base
  }, [horizontalLayoutProps?.navMenu?.sx, userNavMenuContent])

  const isRTL = settings.direction === 'rtl'

  const toolbarGridSx = useMemo<SxProps<Theme>>(() => (
    {
      width: '100%',
      display: 'grid',
      alignItems: 'center',
      columnGap: (theme: Theme) => theme.spacing(4),
      minHeight: 'inherit',
      gridTemplateColumns: navHidden ? 'auto auto' : 'auto 1fr auto',
      gridTemplateAreas: navHidden
        ? (isRTL ? '"logo actions"' : '"actions logo"')
        : (isRTL ? '"logo nav actions"' : '"actions nav logo"')
    }
  ), [isRTL, navHidden])

  return (
    <HorizontalLayoutWrapper className='layout-wrapper'>
      <MainContentWrapper className='layout-content-wrapper' sx={{ ...(contentHeightFixed && { maxHeight: '100vh' }) }}>
        {/* Navbar (or AppBar) and Navigation Menu Wrapper */}
        <AppBar
          color='default'
          elevation={skin === 'bordered' ? 0 : 3}
          className='layout-navbar-and-nav-container'
          position={appBar === 'fixed' ? 'sticky' : 'static'}
          sx={{
            alignItems: 'center',
            color: 'text.primary',
            justifyContent: 'center',
            backgroundColor: 'background.paper',
            ...(appBar === 'static' && { zIndex: 13 }),
            ...(skin === 'bordered' && { borderBottom: theme => `1px solid ${theme.palette.divider}` }),
            transition: 'border-bottom 0.2s ease-in-out, backdrop-filter .25s ease-in-out, box-shadow .25s ease-in-out',
            ...(appBar === 'fixed'
              ? appBarBlur && {
                backdropFilter: 'blur(8px)',
                backgroundColor: theme => hexToRGBA(theme.palette.background.paper, 0.85)
              }
              : {}),
            ...userAppBarStyle
          }}
          {...userAppBarProps}
        >
          <Toolbar
            className='navbar-content-container'
            sx={{
              mx: 'auto',
              width: '100%',
              ...(contentWidth === 'boxed' && { '@media (min-width:1440px)': { maxWidth: 1440 } }),
              minHeight: theme => `${(theme.mixins.toolbar.minHeight as number) - 1}px !important`
            }}
          >
            <Box
              className='horizontal-toolbar-content'
              sx={toolbarGridSx}
            >
              <Box
                className='horizontal-toolbar-actions-left'
                sx={{
                  gridArea: 'actions',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isRTL ? 'flex-end' : 'flex-start',
                  columnGap: theme => theme.spacing(2)
                }}
              >
                {appBarContent}
              </Box>
              {navHidden ? null : (
                <Box
                  className='horizontal-toolbar-navigation'
                  sx={navContainerSx}
                >
                  {beforeNavMenuContent}
                  {navMenuContent}
                  {afterNavMenuContent}
                </Box>
              )}
              <Box
                className='horizontal-toolbar-actions-right'
                sx={{
                  gridArea: 'logo',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isRTL ? 'flex-start' : 'flex-end',
                  columnGap: theme => theme.spacing(2)
                }}
              >
                {brandingContent}
                {LogoComponent ? (
                  <Box className='horizontal-toolbar-logo' sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <LogoComponent themeBasedColor='auto' />
                  </Box>
                ) : null}
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <ContentWrapper
          className='layout-page-content'
          sx={{
            ...(contentHeightFixed && { display: 'flex', overflow: 'hidden' }),
            ...(contentWidth === 'boxed' && {
              mx: 'auto',
              '@media (min-width:1440px)': { maxWidth: 1440 },
              '@media (min-width:1200px)': { maxWidth: '100%' }
            })
          }}
        >
          {children}
        </ContentWrapper>

        {/* Footer */}
        <Footer {...props} footerStyles={footerProps?.sx} footerContent={footerProps?.content} />

        {/* Customizer */}
        {themeConfig.disableCustomizer || hidden ? null : <Customizer />}

        {/* Scroll to top button */}
        {scrollToTop ? (
          scrollToTop(props)
        ) : (
          <ScrollToTop className='mui-fixed'>
            <Fab color='primary' size='small' aria-label='scroll back to top'>
              <Icon icon='mdi:arrow-up' />
            </Fab>
          </ScrollToTop>
        )}
      </MainContentWrapper>
    </HorizontalLayoutWrapper>
  )
}
