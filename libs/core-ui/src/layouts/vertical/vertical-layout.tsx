import React, { FC, useState } from 'react';
import { Fab, styled, Box, BoxProps } from '../../foundations/mui';
import { Icon, Customizer, Footer, ScrollToTop } from '../../components';
import { themeConfig } from '../../configs';
import { ILayout } from '../types';
import { LayoutAppBar } from './app-bar';
import { Navigation } from './navigation';

const VerticalLayoutWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  "@media print": {
    backgroundColor: theme.palette.background.default,
  }
}));

const MainContentWrapper = styled(Box)(() => ({
  flexGrow: 1,
  minWidth: 0,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column'
}));
type ContentWrapperBaseProps = BoxProps<'main'>;

const ContentWrapperBase = React.forwardRef<HTMLElement, ContentWrapperBaseProps>((props, ref) => {
  const { component = 'main', ...rest } = props;

  return <Box ref={ref} component={component} {...rest} />;
});

ContentWrapperBase.displayName = 'ContentWrapperBase';

const ContentWrapper = styled(ContentWrapperBase)(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  padding: theme.spacing(6),
  transition: 'padding .25s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}));

export const VerticalLayout: FC<ILayout> = (props) => {
  const { hidden, settings, children, scrollToTop, footerProps, contentHeightFixed, verticalLayoutProps } = props;
  const { skin, navHidden, contentWidth } = settings;
  const { navigationSize, disableCustomizer, collapsedNavigationSize } = themeConfig;
  const navWidth = navigationSize;
  const navigationBorderWidth = skin === 'bordered' ? 1 : 0;
  const collapsedNavWidth = collapsedNavigationSize;
  const [navVisible, setNavVisible] = useState<boolean>(false);
  const toggleNavVisibility = () => setNavVisible(!navVisible);

  return (
    <>
      <VerticalLayoutWrapper className='layout-wrapper no-break'>
        {/* Navigation Menu */}
        {navHidden && !(navHidden && settings.lastLayout === 'horizontal') ? null : (
          <Navigation
            Logo={verticalLayoutProps.Logo}
            navWidth={navWidth}
            navVisible={navVisible}
            setNavVisible={setNavVisible}
            collapsedNavWidth={collapsedNavWidth}
            toggleNavVisibility={toggleNavVisibility}
            navigationBorderWidth={navigationBorderWidth}
            navMenuContent={verticalLayoutProps.navMenu.content}
            navMenuBranding={verticalLayoutProps.navMenu.branding}
            verticalNavItems={verticalLayoutProps.navMenu.navItems}
            navMenuProps={verticalLayoutProps.navMenu.componentProps}
            afterNavMenuContent={verticalLayoutProps.navMenu.afterContent}
            beforeNavMenuContent={verticalLayoutProps.navMenu.beforeContent}
            {...props}
          />
        )}
        <MainContentWrapper
          className='layout-content-wrapper'
          sx={{ ...(contentHeightFixed && { maxHeight: '100vh' }) }}
        >
          {/* AppBar Component */}
          <LayoutAppBar
            toggleNavVisibility={toggleNavVisibility}
            appBarContent={verticalLayoutProps.appBar?.content}
            appBarProps={verticalLayoutProps.appBar?.componentProps}
            {...props}
          />

          {/* Content */}
          <ContentWrapper
            className='layout-page-content'
            sx={{
              ...(contentHeightFixed && {
                overflow: 'hidden',
                '& > :first-of-type': { height: '100%' }
              }),
              ...(contentWidth === 'boxed' && {
                mx: 'auto',
                // '@media (min-width:1440px)': { maxWidth: 1440 },
                '@media (min-width:1200px)': { maxWidth: '100%' }
              })
            }}
          >
            {children}
          </ContentWrapper>

          {/* Footer Component */}
          <Footer footerStyles={footerProps?.sx} footerContent={footerProps?.content} {...props} />
        </MainContentWrapper>
      </VerticalLayoutWrapper>

      {/* Customizer */}
      {disableCustomizer || hidden ? null : <Customizer />}

      {/* Scroll to top button */}
      {scrollToTop ? (
        scrollToTop(props)
      ) : (
        <ScrollToTop className='mui-fixed print-hide'>
          <Fab color='primary' size='small' aria-label='scroll back to top'>
            <Icon icon='mdi:arrow-up' />
          </Fab>
        </ScrollToTop>
      )}
    </>
  )
}
