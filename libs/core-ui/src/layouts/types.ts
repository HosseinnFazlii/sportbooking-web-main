/* eslint-disable @typescript-eslint/no-explicit-any */
// // ** Type Imports
import { CSSProperties, FC, ReactNode } from 'react';
import { Theme, SxProps, PaletteMode, AppBarProps, SwipeableDrawerProps } from '../foundations';
import type { Settings } from '../contexts';
import { ILogo } from '../components';

export type LayoutDirectionType = 'vertical' | 'horizontal';
export type LayoutType = LayoutDirectionType | 'blank' | 'blankWithAppBar';
export type SkinType = 'default' | 'bordered';
export type ModeType = PaletteMode | 'semi-dark';
export type ContentWidthType = 'full' | 'boxed';
export type AppBarType = 'fixed' | 'static' | 'hidden';
export type FooterType = 'fixed' | 'static' | 'hidden';
export type ThemeColorType = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export type VerticalNavToggleType = 'accordion' | 'collapse';
export type HorizontalMenuToggleType = 'hover' | 'click';
export type BadgeColorType = 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
export type PositionType = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface IPage {
  title?: string;
}

export interface IBlankLayout {
  children: ReactNode;
  style?: CSSProperties;
}

// export interface IBlankLayoutWithAppBar extends IBlankLayout { }

export interface INavSectionTitle {
  action?: string;
  subject?: string;
  sectionTitle: string;
}

export interface IVerticalNavSectionTitle {
  navHover: boolean;
  settings: Settings;
  item: INavSectionTitle;
  collapsedNavWidth: number;
  navigationBorderWidth: number;
}

export interface INavLink {
  icon?: string;
  path?: string;
  title: string;
  action?: string;
  subject?: string;
  disabled?: boolean;
  badgeContent?: string;
  externalLink?: boolean;
  openInNewTab?: boolean;
  badgeColor?: BadgeColorType;
}

export interface INavGroup {
  icon?: string;
  title: string;
  action?: string;
  subject?: string;
  badgeContent?: string;
  children?: (INavGroup | INavLink)[];
  badgeColor?: BadgeColorType;
}


export interface IVerticalNavGroup {
  item: INavGroup;
  navHover: boolean;
  parent?: INavGroup;
  navVisible: boolean;
  groupActive: string[];
  collapsedNavWidth: number;
  currentActiveGroup: string[];
  navigationBorderWidth: number;
  settings: Settings;
  isSubToSub?: INavGroup | undefined;
  saveSettings: HandleSaveSettingsType;
  setGroupActive: HandleSetValuesType;
  setCurrentActiveGroup: HandleSetValuesType;
  toggleNavVisibility: () => void;
}

export type VerticalNavItemsType = (INavLink | INavGroup | INavSectionTitle)[];
export type HorizontalNavItemsType = (INavLink | INavGroup | INavSectionTitle)[];
export type NavContentType = (props?: any) => ReactNode;
export type HandleVoidType = () => void;
export type HandleSetBooleanType = (value: boolean) => void;
export type HandleSaveSettingsType = (values: Settings) => void;
export type HandleSetValuesType = (values: string[]) => void;
export type NavSxPropsType = SxProps<Theme>;

export interface IFooter {
  sx?: NavSxPropsType;
  content?: NavContentType;
}

export type VerticalComponentPropsType = Omit<SwipeableDrawerProps, 'open' | 'onOpen' | 'onClose'>;

export interface IVerticalNavHeader {
  navHover: boolean;
  collapsedNavWidth: number;
  hidden: boolean;
  navigationBorderWidth: number;
  Logo: FC<ILogo>;
  settings: Settings;
  saveSettings: HandleSaveSettingsType;
  toggleNavVisibility: () => void;
  navMenuBranding?: NavContentType;
}

export interface IVerticalNavigation {
  navWidth: number;
  navVisible: boolean;
  collapsedNavWidth: number;
  hidden: boolean;
  navigationBorderWidth: number;
  settings: Settings;
  children: ReactNode;
  verticalNavItems?: VerticalNavItemsType;
  navMenuProps?: VerticalComponentPropsType;
  Logo: FC<ILogo>;
  toggleNavVisibility: HandleVoidType;
  setNavVisible: HandleSetBooleanType;
  saveSettings: HandleSaveSettingsType;
  navMenuContent?: NavContentType;
  navMenuBranding?: NavContentType;
  afterNavMenuContent?: NavContentType;
  beforeNavMenuContent?: NavContentType;
}


export interface IVerticalNavItems {
  parent?: INavGroup;
  navHover: boolean;
  collapsedNavWidth: number;
  navVisible: boolean;
  groupActive: string[];
  isSubToSub?: INavGroup;
  currentActiveGroup: string[];
  navigationBorderWidth: number;
  verticalNavItems?: VerticalNavItemsType;
  settings: Settings;
  toggleNavVisibility: HandleVoidType;
  saveSettings: HandleSaveSettingsType;
  setGroupActive: HandleSetValuesType;
  setCurrentActiveGroup: HandleSetValuesType;
}

export interface IVerticalLayout {
  Logo: FC<ILogo>;
  appBar?: {
    componentProps?: AppBarProps;
    content?: NavContentType;
  }
  navMenu: {
    navItems?: VerticalNavItemsType;
    content?: NavContentType;
    branding?: NavContentType;
    afterContent?: NavContentType;
    beforeContent?: NavContentType;
    componentProps?: VerticalComponentPropsType;
  }
}

export interface IHorizontalLayout {
  Logo: FC<ILogo>;
  appBar?: {
    componentProps?: AppBarProps;
    content?: NavContentType;
  }
  navMenu?: {
    navItems?: VerticalNavItemsType;
    content?: NavContentType;
    branding?: NavContentType;
    afterContent?: NavContentType;
    beforeContent?: NavContentType;
    componentProps?: VerticalComponentPropsType;
    sx?: SxProps<Theme>;
  }
}

export type { Settings };


export interface ILayout {
  hidden: boolean;
  settings: Settings;
  children: ReactNode;
  footerProps?: IFooter;
  contentHeightFixed?: boolean;
  scrollToTop?: NavContentType;
  saveSettings: HandleSaveSettingsType;
  verticalLayoutProps: IVerticalLayout;
  horizontalLayoutProps?: IHorizontalLayout;
}
