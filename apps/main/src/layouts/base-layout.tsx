// apps/main/src/layouts/base-layout.tsx
import { ReactNode, FC } from 'react'
import { Theme, useMediaQuery, Layout, useSettings, CourticLogo, RismunLogo, useAuth } from '@mf-core/core-ui';
import { useTranslation } from 'react-i18next';
import { VerticalAppBarContent } from "./vertical/app-bar-content";
import { HorizontalAppBarContent } from "./horizontal/app-bar-content";
import { navigation } from '../navigation';

interface IBaseLayout {
  children: ReactNode;
  contentHeightFixed?: boolean;
}

export const BaseLayout: FC<IBaseLayout> = ({ children, contentHeightFixed }) => {
  const { settings, saveSettings } = useSettings();
  const { user } = useAuth();
  const { t } = useTranslation();

  // ** Vars for server side navigation
  // const { menuItems: verticalMenuItems } = ServerSideVerticalNavItems()
  // const { menuItems: horizontalMenuItems } = ServerSideHorizontalNavItems()

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/material-ui/react-use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical'
  }

  const menuItems = navigation(
    user && user.menus ? user.menus.map(m => ({ ...m, parentId: m.parentId ? m.parentId : undefined })) : [],
    t
  )

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      verticalLayoutProps={{
        Logo: CourticLogo,
        navMenu: {
          navItems: menuItems

          // Uncomment the below line when using server-side menu in vertical layout and comment the above line
          // navItems: verticalMenuItems
        },
        appBar: {
          content: props => (
            settings.layout === 'horizontal' ?
              <HorizontalAppBarContent
                hidden={hidden}
                settings={settings}
                saveSettings={saveSettings}
                toggleNavVisibility={props.toggleNavVisibility}
              /> :
              <VerticalAppBarContent
                hidden={hidden}
                settings={settings}
                saveSettings={saveSettings}
                toggleNavVisibility={props.toggleNavVisibility}
              />
          )
        }
      }}
      horizontalLayoutProps={{
        Logo: CourticLogo,
        navMenu: {
          navItems: menuItems
        },
        appBar: {
          content: props => (
            <HorizontalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          )
        }
      }}
    >
      {children}
    </Layout>
  )
}
